resource "azurerm_resource_group" "handwrite" {
    name     = var.app_name
    location = var.location
}