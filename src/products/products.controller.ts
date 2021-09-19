import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { get } from "http";
import { ProductService } from "./products.service";

@Controller("products")
export class ProductsController {
    constructor( private readonly productService: ProductService) {}
    
    @Post()
    addProduct(
        @Body('title') prodTitle: String,
        @Body("description") prodDesc: String,
        @Body("price") prodPrice: number) {
        const generatedId = this.productService.insertProduct(prodTitle, prodDesc, prodPrice);
        return {id: generatedId}
    }
    
    @Get()
    getAllProducts() { return this.productService.getProducts() }
    
    @Get(':id')
    getProduct(@Param('id') prodId: String) {
        return this.productService.getSingleProduct(prodId)
    }

    @Patch(":id")
    updateProduct(
        @Param('id') prodId: String,
        @Body('title') prodTitle: String,
        @Body("description") prodDesc: String,
        @Body("price") prodPrice: number
    ) {
        this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null
    }

    @Delete(':id')
    deleteProduct(
        @Param('id') prodId: String,
    ) {
        this.productService.deleteProduct(prodId);
        return null;
     }
 }