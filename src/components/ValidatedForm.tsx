import * as React from 'react';
import { Text, View } from 'react-native';
import { AdaptedButton } from './AdaptedButton';
import BaseValidatedForm, { Props as BaseProps } from 'super-layouts/dist/components/ValidatedForm';
import { Toolbar, toolbarStyles } from './Toolbar';

export type Props<Values> = {
  inputs: BaseProps<Values>['inputs'];
  onSubmit: BaseProps<Values>['onSubmit'];
  onCancel: BaseProps<Values>['onCancel'];
  defaultValues: BaseProps<Values>['defaultValues'];
  CustomSubmitButton?: BaseProps<Values>['SubmitButton'];
  CustomActionBar?: BaseProps<Values>['ActionBar'];
};

export class ValidatedForm<Values> extends React.PureComponent<Props<Values>> {
  render() {
    const {
      CustomSubmitButton = AdaptedButton,
      CustomActionBar = Toolbar,
      ...rest
    } = this.props;
    return (
      <BaseValidatedForm
        ActionsContainer={View}
        SubmitButton={CustomSubmitButton}
        CancelButton={AdaptedButton}
        Text={Text}
        View={View}
        ActionBar={CustomActionBar}
        {...rest}
      />
      );
  }
}

export { PluggableInput } from 'super-layouts/dist/components/ValidatedForm';
