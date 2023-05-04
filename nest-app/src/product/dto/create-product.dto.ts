export class CreateProductDto {
  readonly name: string;
  readonly price: number;
  readonly discount: number;
  readonly description: string;
  readonly img?: string;
}
