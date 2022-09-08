interface IProductsService<T> {
  getAll(): Promise<T[]>
  getById(id: number): Promise<T>
  search(query: string): Promise<T[]>
  create(product: T): Promise<T>
  delete(id: number): Promise<boolean>
  update(id: number, product: T): Promise<boolean>
};

export default IProductsService;