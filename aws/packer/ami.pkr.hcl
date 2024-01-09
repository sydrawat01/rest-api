packer {
  required_plugins {
    git = {
      version = ">=v0.3.2"
      source  = "github.com/ethanmdavidson/git"
    }
    amazon = {
      version = "~> 1"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

variable "aws_region" {
  type        = string
  description = "AWS Region"
  default     = "us-east-1"
}

variable "source_ami" {
  type        = string
  description = "Default Ubuntu AMI to build our custom AMI"
  default     = "ami-08c40ec9ead489470" #Ubuntu 22.04 LTS
}

variable "ami_prefix" {
  type        = string
  description = "AWS AMI name prefix"
  default     = "ami_prefix"
}

variable "ssh_username" {
  type        = string
  description = "username to ssh into the AMI Instance"
  default     = "username"
}

variable "subnet_id" {
  type        = string
  description = "Subnet of the default VPC"
  default     = "subnet-03d1bcaedaf95a150"
}

variable "OS" {
  type        = string
  description = "Base operating system version"
  default     = "OS"
}

variable "ubuntu_version" {
  type        = string
  description = "Version of the custom AMI"
  default     = "ubuntu-version"
}

variable "dev_id" {
  type        = string
  description = "AWS dev account ID"
  default     = "54321"
}

variable "prod_id" {
  type        = string
  description = "AWS prod account ID"
  default     = "12345"
}

variable "instance_type" {
  type        = string
  description = "AWS AMI instance type"
  default     = "t3.micro"
}
variable "volume_type" {
  type        = string
  description = "EBS volume type"
  default     = "gp2"
}
variable "volume_size" {
  type        = string
  description = "EBS volume size"
  default     = "50"
}
variable "device_name" {
  type        = string
  description = "EBS device name"
  default     = "/dev/sda1"
}

locals {
  truncated_sha = substr(data.git-commit.cwd-head.hash, 0, 8)
  version       = data.git-repository.cwd.head == "master" && data.git-repository.cwd.is_clean ? var.ubuntu_version : "${var.ubuntu_version}-${local.truncated_sha}"
  timestamp     = substr(regex_replace(timestamp(), "[- TZ:]", ""), 8, 13)
}

data "git-repository" "cwd" {}
data "git-commit" "cwd-head" {}

source "amazon-ebs" "ec2" {
  region          = "${var.aws_region}"
  ami_name        = "${var.ami_prefix}-${local.truncated_sha} [${var.ubuntu_version}-${local.timestamp}]"
  ami_description = "Linux AMI for CSYE 6225 built by ${data.git-commit.cwd-head.author}"
  ami_users = [
    "${var.dev_id}",  # dev account ID
    "${var.prod_id}", # prod account ID
  ]
  tags = {
    Name         = "${var.ami_prefix}-${local.truncated_sha}"
    Base_AMI_ID  = "${var.source_ami}"
    TimeStamp_ID = "${local.timestamp}"
    OS_Version   = "${var.OS}"
    Release      = "22.04 LTS"
    Author       = "${data.git-commit.cwd-head.author}"
  }
  ami_regions = [
    "${var.aws_region}",
  ]

  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }

  instance_type = "${var.instance_type}"
  source_ami    = "${var.source_ami}"
  ssh_username  = "${var.ssh_username}"
  subnet_id     = "${var.subnet_id}"

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "${var.device_name}"
    volume_size           = "${var.volume_size}"
    volume_type           = "${var.volume_type}"
  }
}

build {
  sources = ["source.amazon-ebs.ec2"]

  # https://www.packer.io/docs/provisioners/file#uploading-files-that-don-t-exist-before-packer-starts
  provisioner "file" {
    source      = "../../webapp.zip"        # path in local system to a tar.gz file
    destination = "/home/ubuntu/webapp.zip" # path in the AMI to store the webapp
  }

  provisioner "file" {
    source      = "nodeserver.service"              # path in local system to a tar.gz file
    destination = "/home/ubuntu/nodeserver.service" # path in the AMI to store the webapp
  }

  provisioner "shell" {
    environment_vars = [
      "DEBIAN_FRONTEND=noninteractive",
      "CHECKPOINT_DISABLE=1"
    ]
    scripts = [
      "../scripts/install.sh",
      "../scripts/post-install.sh",
    ]
  }

  post-processor "manifest" {
    output     = "manifest.json"
    strip_path = true
  }
}