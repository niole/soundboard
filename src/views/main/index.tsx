import React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { View, Text } from 'react-native';
import RouteAwareLayout, { Props } from 'super-layouts/dist/layouts/RouteAwareLayout';
import CardDrilldownLayout from 'super-layouts/dist/layouts/CardDrilldownLayout'
import Tabs from '../../components/Tabs';
import HomeView from '../home';
import CreateView from '../create';

type NavigationProps = {
    navigation: NavigationScreenProp<{}, {}>;
};

const getCurrentEndoint = (props: NavigationProps): string => {
    const routeName = props.navigation.state.routeName!;
    if (routeName === 'Create') {
        return `/create/fakeCreatorId`;
    }
    return `/${props.navigation.state.routeName!}`;
};

class MainSection extends React.PureComponent<NavigationProps> {
    navigate = (url: string, matcher: string[], routeParams: { [key: string]: any }): void => {
        const viewName = matcher[0];
        this.props.navigation.navigate(viewName, routeParams);
    }

    getEndpoint = (props: Props<{}, NavigationProps>): string => {
        return getCurrentEndoint(this.props);
    }

    render() {
        return (
            <RouteAwareLayout
                TabContainer={Tabs}
                currentEndpoint={getCurrentEndoint(this.props)}
                navigator={this.navigate}
                getEndpoint={this.getEndpoint}
                navigation={this.props.navigation}
                defaultActiveKey={this.props.navigation.state.routeName!}
                layouts={[
                    {
                        layoutKey: 'Home',
                        matcher: '/home',
                        View: HomeView,
                        title: 'All',
                    },
                    {
                        layoutKey: 'Create',
                        matcher: '/create/:creatorId',
                        View: CreateView,
                        title: 'Create New Soundboard',
                    },
                ]}
            />
        );
    }
}

export default MainSection;
