// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma.service';
// import { CreateCartDto } from './dto/create-cart.dto';
// import { UpdateCartDto } from './dto/update-cart.dto';

// @Injectable()
// export class ProductOnCartRepository {
//   constructor(private prisma: PrismaService) {}
//   createProductOnCart(createCartDto: CreateCartDto, cartId: number) {
//     return this.prisma.productOnCart.create({
//       data: {
//         ...createCartDto,
//         cartId,
//       },
//     });
//   }
//   getProductOnCart(cartId: number) {
//     return this.prisma.productOnCart.findMany({
//       where: { cartId },
//       include: { product: true },
//     });
//   }
//   updateProductOnCart(
//     cartId: number,
//     productId: number,
//     updateCartDto: UpdateCartDto,
//   ) {
//     return this.prisma.productOnCart.update({
//       where: {
//         cartId_productId: {
//           cartId,
//           productId,
//         },
//       },
//       data: { ...updateCartDto },
//     });
//   }
//   deleteProductOnCart(cartId: number, productId: number) {
//     return this.prisma.productOnCart.delete({
//       where: {
//         cartId_productId: {
//           cartId,
//           productId,
//         },
//       },
//     });
//   }
//   deleteAllProductOnCart(cartId: number) {
//     return this.prisma.productOnCart.deleteMany({
//       where: { cartId },
//     });
//   }
// }
