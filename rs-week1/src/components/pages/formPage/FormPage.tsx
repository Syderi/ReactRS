import './FormPage.css';
import { IFormCard } from 'components/types/interface';
import React, { Component, RefObject } from 'react';
import FormCard from './FormCard';
import defaultPic from '../../../assets/img/default.png';
import { validatePrice, validateFirstSubmitButton, validateText } from './Validate';

interface IFormPageProps {
  onChangeNamePage: (namePage: string) => void;
}

interface IFormPageState {
  imageUrl: string;
  imageFile: File | null;
  products: IFormCard[];
  buttonSubmitStatusDisabled: boolean;
  spanPriceValid: boolean;
  spanTitleValid: boolean;
  spanDescriptionValid: boolean;
}

class FormPage extends Component<IFormPageProps, IFormPageState> {
  defaultFile: File;
  inputTitleRef: React.RefObject<HTMLInputElement>;
  inputPriceRef: React.RefObject<HTMLInputElement>;
  inputFileRef: React.RefObject<HTMLInputElement>;
  inputCategoryRef: React.RefObject<HTMLSelectElement>;
  inputDescriptionRef: RefObject<HTMLTextAreaElement>;

  constructor(props: IFormPageProps) {
    super(props);
    this.defaultFile = new File([defaultPic], 'default.png', { type: 'image/png' });
    this.inputTitleRef = React.createRef();
    this.inputPriceRef = React.createRef();
    this.inputFileRef = React.createRef();
    this.inputCategoryRef = React.createRef();
    this.inputDescriptionRef = React.createRef();
    this.state = {
      imageUrl: defaultPic,
      imageFile: this.defaultFile,
      products: [],
      buttonSubmitStatusDisabled: true,
      spanPriceValid: false,
      spanTitleValid: false,
      spanDescriptionValid: false,
    };
  }

  componentDidMount() {
    this.props.onChangeNamePage('Form Page');
    this.addFirstListenerInputs();
  }

  componentDidUpdate(prevProps: IFormPageProps, prevState: IFormPageState) {
    const { spanDescriptionValid, spanPriceValid, spanTitleValid } = this.state;

    if (
      spanDescriptionValid !== prevState.spanDescriptionValid ||
      spanPriceValid !== prevState.spanPriceValid ||
      spanTitleValid !== prevState.spanTitleValid
    ) {
      if (spanDescriptionValid && spanPriceValid && spanTitleValid) {
        this.setState({ buttonSubmitStatusDisabled: false });
      } else {
        this.setState({ buttonSubmitStatusDisabled: true });
      }
    }
  }

  addFirstListenerInputs = () => {
    if (this.inputPriceRef.current) {
      this.inputPriceRef.current.oninput = this.handleInputFirstStart(this.inputPriceRef);
    }
    if (this.inputTitleRef.current) {
      this.inputTitleRef.current.oninput = this.handleInputFirstStart(this.inputTitleRef);
    }
    if (this.inputDescriptionRef.current) {
      this.inputDescriptionRef.current.oninput = this.handleInputFirstStart(
        this.inputDescriptionRef
      );
    }
  };

  removeFirstListenerInputs() {
    if (this.inputPriceRef.current) {
      this.inputPriceRef.current.removeEventListener(
        'input',
        this.handleInputFirstStart(this.inputPriceRef)
      );
    }
    if (this.inputTitleRef.current) {
      this.inputTitleRef.current.removeEventListener(
        'input',
        this.handleInputFirstStart(this.inputTitleRef)
      );
    }
    if (this.inputDescriptionRef.current) {
      this.inputDescriptionRef.current.removeEventListener(
        'input',
        this.handleInputFirstStart(this.inputDescriptionRef)
      );
    }
  }

  // addOnChangeListenerInputs = () => {
  //   if (this.inputPriceRef.current) {
  //     this.inputPriceRef.current.oninput = () => {
  //       this.setState({ spanPriceValid: validatePrice(this.inputPriceRef) });
  //     };
  //   }
  //   if (this.inputTitleRef.current) {
  //     this.inputTitleRef.current.oninput = () => {
  //       this.setState({ spanTitleValid: validateText(this.inputTitleRef) });
  //     };
  //   }
  //   if (this.inputDescriptionRef.current) {
  //     this.inputDescriptionRef.current.oninput = () => {
  //       this.setState({ spanDescriptionValid: validateText(this.inputDescriptionRef) });
  //     };
  //   }
  // };

  addOnChangeListenerInputs = () => {
    if (this.inputPriceRef.current) {
      this.inputPriceRef.current.oninput = () => {
        this.checkValidAllInputs();
      };
    }
    if (this.inputTitleRef.current) {
      this.inputTitleRef.current.oninput = () => {
        this.checkValidAllInputs();
      };
    }
    if (this.inputDescriptionRef.current) {
      this.inputDescriptionRef.current.oninput = () => {
        this.checkValidAllInputs();
      };
    }
  };

  removeOnChangeListenerInputs = () => {
    if (this.inputPriceRef.current) {
      this.inputPriceRef.current.removeEventListener('input', () => {
        this.checkValidAllInputs();
      });
    }
    if (this.inputTitleRef.current) {
      this.inputTitleRef.current.removeEventListener('input', () => {
        this.checkValidAllInputs();
      });
    }
    if (this.inputDescriptionRef.current) {
      this.inputDescriptionRef.current.removeEventListener('input', () => {
        this.checkValidAllInputs();
      });
    }
  };

  checkValidAllInputs = () => {
    this.setState({ spanPriceValid: validatePrice(this.inputPriceRef) });
    this.setState({ spanTitleValid: validateText(this.inputTitleRef) });
    this.setState({ spanDescriptionValid: validateText(this.inputDescriptionRef) });
  };

  // changeDisableButton = () => {
  //   const { spanDescriptionValid, spanPriceValid, spanTitleValid } = this.state;
  //   console.log('spanDescriptionValid', spanDescriptionValid);
  //   console.log('spanPriceValid', spanPriceValid);
  //   console.log('spanTitleValid', spanTitleValid);

  //   if (spanDescriptionValid && spanPriceValid && spanTitleValid) {
  //     this.setState({ buttonSubmitStatusDisabled: false });
  //   } else {
  //     this.setState({ buttonSubmitStatusDisabled: true });
  //   }
  // };

  handleInputFirstStart = (
    ref: React.RefObject<HTMLInputElement> | React.RefObject<HTMLTextAreaElement>
  ) => {
    return () => {
      if (validateFirstSubmitButton(ref.current as HTMLInputElement)) {
        this.setState({ buttonSubmitStatusDisabled: false });
      }
    };
  };

  handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (this.inputFileRef.current !== null) {
          const imageFile = this.inputFileRef.current.files && this.inputFileRef.current.files[0];
          if (imageFile !== null) {
            this.setState({
              imageUrl: URL.createObjectURL(imageFile),
              imageFile,
            });
          }
        }
      };
      reader.readAsDataURL(event.target.files[0]);
      // this.setState({ buttonSubmitStatusDisabled: false });
    }
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.removeFirstListenerInputs();
    this.addOnChangeListenerInputs();

    // this.setState({ spanPriceValid: validatePrice(this.inputPriceRef) });
    // this.setState({ spanTitleValid: validateText(this.inputTitleRef) });
    // this.setState({ spanDescriptionValid: validateText(this.inputDescriptionRef) });
    this.checkValidAllInputs();

    const { imageUrl, products, spanDescriptionValid, spanPriceValid, spanTitleValid } = this.state;

    if (!spanDescriptionValid && !spanPriceValid && !spanTitleValid) {
      this.setState({ buttonSubmitStatusDisabled: true });
      return;
    }

    let newTitle = '';
    if (this.inputTitleRef.current) {
      newTitle = this.inputTitleRef.current.value;
      this.inputTitleRef.current.value = '';
    }

    let newDescription = '';
    if (this.inputDescriptionRef.current) {
      newDescription = this.inputDescriptionRef.current.value;
      this.inputDescriptionRef.current.value = '';
    }

    const newPrice = '';
    if (this.inputPriceRef.current) {
      newDescription = this.inputPriceRef.current.value;
      this.inputPriceRef.current.value = '';
    }

    let newCategory = '';
    if (this.inputCategoryRef.current) {
      newCategory = this.inputCategoryRef.current.value;
      this.inputCategoryRef.current.value = 'smartphones';
    }

    const newProduct = {
      id: Date.now(),
      title: newTitle,
      price: Number(newPrice),
      description: newDescription,
      imageUrl,
      category: newCategory,
    };

    const newProducts = [...products, newProduct];

    this.setState({
      imageUrl: defaultPic,
      imageFile: this.defaultFile,
      products: newProducts,
    });
    // console.log('submit', this.state);

    this.handleSetDefaultFile();
    this.addFirstListenerInputs();
    this.removeOnChangeListenerInputs();
    this.setState({ buttonSubmitStatusDisabled: true });
    this.setState({ spanPriceValid: false });
    this.setState({ spanTitleValid: false });
    this.setState({ spanDescriptionValid: false });
  };

  handleSetDefaultFile = () => {
    if (this.inputFileRef.current) {
      const dt = new DataTransfer();
      dt.items.add(this.defaultFile);
      this.inputFileRef.current.files = dt.files;
    }
  };

  render() {
    const {
      products,
      imageFile,
      buttonSubmitStatusDisabled,
      spanPriceValid,
      spanTitleValid,
      spanDescriptionValid,
    } = this.state;
    return (
      <div className="form-page">
        <h3>Form page</h3>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-input">
            <label htmlFor="title-input">
              Title: {!spanTitleValid && <span className="form-input-span-error">Error</span>}
            </label>
            <input
              type="text"
              id="title-input"
              ref={this.inputTitleRef}
              placeholder="name product"
            />
          </div>
          <div className="form-input">
            <label htmlFor="price-input">
              Price:
              {!spanPriceValid && <span className="form-input-span-error">Error</span>}
            </label>
            <input type="number" id="price-input" ref={this.inputPriceRef} />
          </div>
          <div className="form-input">
            <label htmlFor="description-input">
              Description:{' '}
              {!spanDescriptionValid && <span className="form-input-span-error">Error</span>}
            </label>
            <textarea
              ref={this.inputDescriptionRef}
              id="description-input"
              placeholder="description product"
            />
          </div>
          <div className="form-input">
            <label htmlFor="image-input">Image:</label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/gif"
              id="image-input"
              onInput={this.handleImageInput}
              ref={this.inputFileRef}
            />
            {imageFile && <span>{imageFile.name}</span>}
          </div>
          <div className="form-input">
            <label htmlFor="category-select">Category:</label>
            <select id="category-select" ref={this.inputCategoryRef}>
              <option value="smartphones">smartphones</option>
              <option value="laptops">laptops</option>
              <option value="fragrances">fragrances</option>
            </select>
          </div>
          <button type="submit" disabled={buttonSubmitStatusDisabled}>
            Submit
          </button>
        </form>
        <div className="form-cards-container">
          {products.length ? (
            products.map((product) => {
              return <FormCard key={product.id} product={{ ...product }} />;
            })
          ) : (
            <div>No products...</div>
          )}
        </div>
      </div>
    );
  }
}

export default FormPage;
