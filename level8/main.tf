provider "aws" {
  region = "ap-south-1" # Change to your desired region
}

terraform {
  backend "s3" {
    bucket         = "my-terraform-state-bucket-rohan1234" # Replace with your bucket name
    key            = "terraform/level7/terraform.tfstate"
    region         = "ap-south-1"
    encrypt        = true
  }
}


# Create an S3 bucket
resource "aws_s3_bucket" "my_bucket" {
  bucket = "my-unique-bucket-name-12345-rohan" # Change to a globally unique name
}

# # resource "aws_s3_bucket_acl" "my_bucket_acl" {
# #   bucket = aws_s3_bucket.my_bucket.id
# #   acl    = "private"
# # }

# Create a Key Pair
resource "tls_private_key" "my_key" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

resource "aws_key_pair" "my_key_pair" {
  key_name   = "my-key-pair"
  public_key = tls_private_key.my_key.public_key_openssh
}

# Save the private key locally
output "private_key" {
  value     = tls_private_key.my_key.private_key_pem
  sensitive = true
}

# Create a Security Group
resource "aws_security_group" "my_security_group" {
  name        = "my-security-group"
  description = "Allow SSH and HTTP access"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow SSH from anywhere (use cautiously)
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow HTTP from anywhere
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Create an IAM Role
resource "aws_iam_role" "my_iam_role" {
  name               = "my-ec2-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action    = "sts:AssumeRole"
        Effect    = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

# Attach a policy to the IAM Role
resource "aws_iam_role_policy" "my_iam_policy" {
  name   = "my-ec2-policy"
  role   = aws_iam_role.my_iam_role.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["s3:*"] # Allow full access to S3
        Effect   = "Allow"
        Resource = "*"
      }
    ]
  })
}

# Attach the AmazonEC2ContainerRegistryFullAccess policy to the IAM Role
resource "aws_iam_role_policy_attachment" "ecr_access" {
  role       = aws_iam_role.my_iam_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess"
}

# Create an IAM Instance Profile
resource "aws_iam_instance_profile" "my_instance_profile" {
  name = "my-instance-profile"
  role = aws_iam_role.my_iam_role.name
}

# Create an EC2 Instance
resource "aws_instance" "my_instance" {
  ami           = "ami-0d03cb826412c6b0f" # Replace with your desired AMI ID
  instance_type = "t3.micro"

  key_name               = aws_key_pair.my_key_pair.key_name
  security_groups        = [aws_security_group.my_security_group.name]
  iam_instance_profile   = aws_iam_instance_profile.my_instance_profile.name

  tags = {
    Name = "MyEC2Instance"
  }
}

# Output the DNS name of the EC2 instance
output "ec2_dns_name" {
  value       = aws_instance.my_instance.public_dns
  description = "The public DNS name of the EC2 instance"
}