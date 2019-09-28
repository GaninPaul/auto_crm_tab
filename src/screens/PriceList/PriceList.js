import React from "react";
import { View, Text } from "react-native";
import styles from "./Sale.styles";
import { Toolbar, ActionButton } from "react-native-material-ui";

class PriceList extends React.Component {

    state = {
        bottomHidden: false
    };

    render() {
        return (
            <View style={styles.container}>
                <Toolbar
                    leftElement="menu"
                    onLeftElementPress={() => console.log("test")}
                    centerElement="Searchable"
                    searchable={{
                        autoFocus: true,
                        placeholder: "Search"
                    }}
                />
                <Text>Home Screen</Text>
            </View>
        );
    }
}

export default Sale;
