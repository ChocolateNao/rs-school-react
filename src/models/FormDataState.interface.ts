import IFormFields from 'models/FormFields.interface';

export default interface IFormDataState {
  uncontrolledFormData: IFormFields[];
  controlledFormData: IFormFields[];
}
