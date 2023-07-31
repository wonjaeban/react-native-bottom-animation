import React, {useRef, useEffect} from 'react';
import {Animated, Dimensions, Pressable, Text, View} from 'react-native';

import {black, gray, white} from 'styles';
import {
  Feather,
  MaterialCommunityIcons,
  Octicons,
} from 'utils/react-native-vector-helper';
import {hs, ss, vs} from 'utils/scailing';

function BottomTabBar({state, descriptors, navigation}) {
  const xPosition = useRef(new Animated.Value(0)).current;

  const windowWidth = Dimensions.get('window').width;
  const elementRatio = Math.floor((1 / state.routeNames.length) * 100);

  useEffect(() => {
    Animated.timing(xPosition, {
      toValue: windowWidth * (elementRatio / 100) * state.index,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {});
  }, [state.index]);

  const RenderingIcons = (index, isFocused, label) => {
    switch (index) {
      case 0:
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Feather
              name="home"
              color={isFocused ? black.origin : gray.dimGray}
              size={ss(25)}
            />
            <Text
              style={{
                color: isFocused ? black.origin : gray.dimGray,
                fontSize: ss(12),
              }}>
              {label}
            </Text>
          </View>
        );
      case 1:
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="clipboard-list-outline"
              color={isFocused ? black.origin : gray.dimGray}
              size={ss(25)}
            />
            <Text
              style={{
                color: isFocused ? black.origin : gray.dimGray,
                fontSize: ss(12),
              }}>
              {label}
            </Text>
          </View>
        );
      case 2:
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="pencil-outline"
              color={isFocused ? black.origin : gray.dimGray}
              size={ss(25)}
            />
            <Text
              style={{
                color: isFocused ? black.origin : gray.dimGray,
                fontSize: ss(12),
              }}>
              {label}
            </Text>
          </View>
        );
      case 3:
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Octicons
              name="person"
              color={isFocused ? black.origin : gray.dimGray}
              size={ss(25)}
            />
            <Text
              style={{
                color: isFocused ? black.origin : gray.dimGray,
                fontSize: ss(12),
              }}>
              {label}
            </Text>
          </View>
        );
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        height: vs(45),
        backgroundColor: gray.lightGray,
        borderTopRightRadius: ss(15),
        borderTopLeftRadius: ss(15),
      }}>
      <Animated.View
        style={{
          position: 'absolute',
          backgroundColor: gray.gainsboro,
          borderRadius: ss(15),
          height: vs(45),
          width: `${elementRatio}%`,
          transform: [{translateX: xPosition}],
        }}
      />
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        return (
          <View key={index} style={{flex: elementRatio}}>
            <Pressable onPress={onPress} style={({pressed}) => []}>
              {RenderingIcons(index, isFocused, label)}
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

export default BottomTabBar;
