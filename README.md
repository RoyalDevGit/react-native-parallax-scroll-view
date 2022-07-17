[![](https://img.shields.io/npm/dm/react-native-parallax-scroll-view.svg?style=flat-square)](https://www.npmjs.com/package/react-native-parallax-scroll-view)

[![NPM](https://nodei.co/npm/react-native-parallax-scroll-view.png)](https://www.npmjs.com/package/react-native-parallax-scroll-view)

# Rodrigocs - Animated Driver

This component now uses Native Driver by default.
Remember to pass a Animated component to `renderScrollComponent`, by default it has `Animated.ScrollView`

# Example
```js
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import CustomScrollView from 'custom-scroll-view'

const AnimatedCustomScrollView = Animated.createAnimatedComponent(CustomScrollView)

render() {
  return (
    <ParallaxScrollView
      backgroundColor="blue"
      contentBackgroundColor="pink"
      parallaxHeaderHeight={300}
      // renderScrollComponent={() => <Animated.View />}
      renderScrollComponent={() => <AnimatedCustomScrollView />}
      renderForeground={() => (
       <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Hello World!</Text>
        </View>
      )}>
      <View style={{ height: 500 }}>
        <Text>Scroll me</Text>
      </View>
    </ParallaxScrollView>
  );
}
```

# react-native-parallax-scroll-view

A `ScrollView`-like component that:

- Has a parallax header
- Has an optional sticky header
- Is composable with any component that expects a `ScrollView` (e.g. `ListView` or [`InfiniteScrollView`](https://github.com/exponentjs/react-native-infinite-scroll-view))
- Can be nested within other views
- Works on iOS and Android

## Installation

```
$ npm install react-native-parallax-scroll-view --save
```

**Note:** For React Native 0.19.0 and earlier, you'll want to use `react-native-parallax-scroll-view@0.17.4`. Version `0.18.0` changes the scrolling API to be compatible with React Native 0.20.0.

## Demo


| iOS | Android |
| --- | ------- |
| ![](./demo.ios.0.17.2.gif) | ![](./demo.android.0.17.2.gif) |

## Basic Usage

```js
import ParallaxScrollView from 'react-native-parallax-scroll-view';

// Inside of a component's render() method:
render() {
  return (
    <ParallaxScrollView
      backgroundColor="blue"
      contentBackgroundColor="pink"
      parallaxHeaderHeight={300}
      renderForeground={() => (
       <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Hello World!</Text>
        </View>
      )}>
      <View style={{ height: 500 }}>
        <Text>Scroll me</Text>
      </View>
    </ParallaxScrollView>
  );
}
```
