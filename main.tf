provider "aws"{
 profile = "default"
 region = "sa-east-1"
}
resource "aws_dynamodb_table" "measurements" {
  name         = "measurements-table"
  billing_mode = "PAY_PER_REQUEST"  

  hash_key = "id"  

  attribute {
    name = "id"
    type = "S"  
  }

  attribute {
    name = "customer_code"
    type = "S"  
  }
  global_secondary_index {
    name               = "customer_code_index"
    hash_key           = "customer_code"
    projection_type    = "ALL"

    
    read_capacity  = 5
    write_capacity = 5
  }
}