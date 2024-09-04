provider "aws"{
 profile = "default"
 region = "sa-east-1"
}
resource "aws_docdb_cluster" "my_cluster" {
    cluster_identifier   = "my-docdb-cluster"
    engine               = "docdb"
    engine_version       = "4.0.0"
    master_username      = "username_deez"
    master_password      = "password_nuts"
    backup_retention_period = 7
    preferred_backup_window = "07:00-09:00"
    skip_final_snapshot   = true
    apply_immediately     = true
    storage_encrypted     = true
    vpc_security_group_ids = [aws_security_group.my_sg.id]
    availability_zones    = ["sa-east-1a", "sa-east-1b"]
    tags = {
        Name = "MyDocDBCluster"
    }
}

resource "aws_security_group" "my_sg" {
    name        = "my-docdb-sg"
    description = "Security group for my DocDB cluster"
    vpc_id      =  var.defaultvpc

    ingress {
        from_port   = 27017
        to_port     = 27017
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}
