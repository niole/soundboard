import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { LayoutProps, TabContainerComponent } from 'super-layouts/dist/layouts/RouteAwareLayout';
import { Toolbar, toolbarStyles } from './Toolbar';

const TabsComponent: TabContainerComponent<{}> = ({ navigators, layouts, onChange, activeKey, ...rest }) => (
    <Tabs
        onChange={onChange}
        activeKey={activeKey}
        layouts={layouts}
        layoutProps={{ navigators, ...rest }}
    />
);

export type TabUiProps = {
    onChange?: (layoutKey: string) => void;
    activeKey?: string;
    layouts: {
        layoutKey: string;
        View: any;
        title: React.ReactNode;
    }[];
    layoutProps: {};
};

export const Tabs: React.FC<TabUiProps> = ({ activeKey, layouts, onChange, layoutProps }) => {
    const [selectedTabKey, setTabKey] = React.useState(activeKey);
    React.useEffect(() => {
        setTabKey(activeKey);
    }, [activeKey]);
    const Layout = layouts.find(({ layoutKey }: LayoutProps<{}>) => layoutKey === selectedTabKey);
    return (
        <View>
            <Toolbar>
                {layouts.map(item => (
                    <View
                        key={item.layoutKey}
                        style={toolbarStyles.button}
                    >
                        <Button
                            buttonStyle={{ borderRadius: 0 }}
                            type="outline"
                            raised={selectedTabKey === item.layoutKey}
                            onPress={() => {
                                setTabKey(item.layoutKey);
                                if (onChange) {
                                    onChange(item.layoutKey);
                                }
                            }}
                            title={item.title as string}
                        />
                    </View>
                ))}
            </Toolbar>
            {Layout && <Layout.View {...layoutProps} />}
        </View>
    );
};

export default TabsComponent;
