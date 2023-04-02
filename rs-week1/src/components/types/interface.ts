interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images?: string[];
}

interface IProductProps {
  product: IProduct;
  handleShowModal: (productId: number) => void;
}

interface IFormCard {
  id?: number;
  title: string;
  description: string;
  price: number;
  date: string;
  productStatus: string;
  category: string;
  imageUrl: string;
}

interface IFormCardProps {
  product: IFormCard;
}

interface IFormInputProps {
  onChangeProduct: (newProduct: IFormCard) => void;
}

interface IFormInputState {
  imageUrl: string;
  imageFile: File | null;
  spanFileValid: boolean;
  spanPriceValid: boolean;
  spanTitleValid: boolean;
  spancategoryValid: boolean;
  spanDescriptionValid: boolean;
  spanDateValid: boolean;
  spanProductStatusValid: boolean;
  spanRulesValid: boolean;
  statusValid: boolean;
}

interface FormData {
  title: string;
  price: number;
  description: string;
  date: string;
  rules: boolean;
  productStatus: string;
  imageFile: FileList;
  category: string;
}

export {
  IProduct,
  IProductProps,
  IFormCard,
  IFormCardProps,
  IFormInputProps,
  IFormInputState,
  FormData,
};
