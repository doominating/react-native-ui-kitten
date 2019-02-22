import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageSourcePropType,
  TextProps,
  ImageProps,
  Image,
  TouchableOpacityProps,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface BottomNavigatorTabProps {
  title?: string;
  getIconSource?: (selected: boolean) => ImageSourcePropType;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

export type Props = BottomNavigatorTabProps & StyledComponentProps & TouchableOpacityProps;

export class BottomNavigatorTab extends React.Component<Props> {

  private onPress = () => {
    if (this.props.onSelect) {
      this.props.onSelect(!this.props.selected);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    return {
      container: {},
      icon: {
        width: source['icon.width'],
        height: source['icon.height'],
        marginBottom: source['icon.marginBottom'],
      },
      title: {
        color: this.props.selected ? source['title.selectedColor'] : source['title.color'],
      },
    };
  };

  private createImageElement(style: StyleType): React.ReactElement<ImageProps> {
    return (
      <Image
        key={0}
        style={style}
        source={this.props.getIconSource(this.props.selected)}
      />
    );
  }

  private createTextElement(style: StyleType): React.ReactElement<TextProps> {
    return (
      <Text
        key={1}
        style={style}>
        {this.props.title}
      </Text>
    );
  }

  private createComponentChildren = (style: StyleType): React.ReactNode => {
    const { getIconSource, title } = this.props;

    return [
      getIconSource ? this.createImageElement(style.icon) : undefined,
      title && title.length !== 0 ? this.createTextElement(style.title) : undefined,
    ];
  };

  public render(): React.ReactNode {
    const { style, themedStyle, ...derivedProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);
    const componentChildren: React.ReactNode = this.createComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        {...derivedProps}
        style={[style, container, strictStyles.container]}
        activeOpacity={1.0}
        onPress={this.onPress}>
        {componentChildren}
      </TouchableOpacity>
    );
  }
}

const strictStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});