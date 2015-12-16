const React = require('react-native');
const {
  Animated,
  Component,
  Dimensions,
  ScrollView,
  StyleSheet,
  View
} = React;

const {
  any,
  bool,
  func,
  number,
  string
} = React.PropTypes;

// Properties accepted by `ParallaxScrollView`.
const IPropTypes = {
  parallaxHeaderHeight: number.isRequired,
  renderParallaxHeader: func.isRequired,
  rowHeight: number,
  backgroundColor: string,
  renderStickyHeader: func,
  renderFixedHeader: func,
  renderBackground: func,
  stickyHeaderHeight: number,
  shouldPadBottom: bool,
  style: any
};

class ParallaxScrollView extends Component {
  constructor(props) {
    super(props);
    if (props.renderStickyHeader && !props.stickyHeaderHeight) {
      console.error('Property `stickyHeaderHeight` must be set if `renderStickyHeader` is used')
    }
    this.state = { scrollY: new Animated.Value(0) };
    this._animatedEvent = Animated.event([{nativeEvent: { contentOffset: { y: this.state.scrollY } } }]);
  }

  render() {
    const { scrollY } = this.state;
    const {
      backgroundColor,
      children,
      parallaxHeaderHeight,
      stickyHeaderHeight,
      renderBackground,
      renderFixedHeader,
      renderParallaxHeader,
      renderStickyHeader,
      onScroll: prevOnScroll = () => {},
      style,
      ...scrollViewProps
    } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.backgroundImage, {
            backgroundColor,
            height: parallaxHeaderHeight,
            width: window.width,
            transform: [{
              translateY: scrollY.interpolate({
                inputRange: [0, parallaxHeaderHeight - stickyHeaderHeight],
                outputRange: [0, -parallaxHeaderHeight],
                extrapolateRight: 'extend',
                extrapolateLeft: 'clamp'
              })
            }, {
              scale: scrollY.interpolate({
                inputRange: [-window.height, 0],
                outputRange: [5, 1],
                extrapolate: 'clamp'
              })
            }]
          }]}>
          <View>
            { renderBackground && renderBackground() }
          </View>
        </Animated.View>
        <ScrollView {...scrollViewProps}
            ref="ScrollView"
            style={[style, styles.scrollView]}
            scrollEventThrottle={16}
            onScroll={e => {
              this._animatedEvent(e);
              prevOnScroll(e);
            }}>
          <View style={styles.parallaxHeaderContainer}>
            <Animated.View
                style={[styles.parallaxHeader, {
                  height: scrollY.interpolate({
                    inputRange: [0, parallaxHeaderHeight - stickyHeaderHeight],
                    outputRange: [parallaxHeaderHeight, stickyHeaderHeight],
                    extrapolate: 'clamp'
                  }),
                  opacity: scrollY.interpolate({
                    inputRange: [0, (parallaxHeaderHeight - stickyHeaderHeight) / 2 - 20, (parallaxHeaderHeight - stickyHeaderHeight) / 2],
                    outputRange: [1, .9, 0],
                    extrapolate: 'extend'
                  })
                }]}>
              { renderParallaxHeader && renderParallaxHeader() }
            </Animated.View>
          </View>
          { children }
        </ScrollView>
        { renderStickyHeader
          ? (
          <View style={[styles.stickyHeader, { height: stickyHeaderHeight }]}>
            <Animated.View
              style={{
                    backgroundColor,
                    height: stickyHeaderHeight,
                    opacity: scrollY.interpolate({
                      inputRange: [-window.height, 0, stickyHeaderHeight],
                      outputRange: [0, 0, 1],
                      extrapolate: 'clamp'
                    })
                  }}>
              <Animated.View
                style={{
                        transform: [{
                          translateY: scrollY.interpolate({
                            inputRange: [-window.height, 0, stickyHeaderHeight],
                            outputRange: [stickyHeaderHeight, stickyHeaderHeight, 0],
                            extrapolate: 'clamp'
                          })
                        }]
                      }}>
                { renderStickyHeader() }
              </Animated.View>
            </Animated.View>
            { renderFixedHeader && renderFixedHeader() }
          </View>
        )
          : null
        }
      </View>
    );
  }

  getScrollResponder() {
    return this.refs.ScrollView.getScrollResponder();
  }

  getInnerViewNode() {
    return this.getScrollResponder().getInnerViewNode();
  }

  scrollTo(destY, destX) {
    this.getScrollResponder().scrollTo(destY, destX);
  }

  scrollWithoutAnimationTo(destY, destX) {
    this.getScrollResponder().scrollWithoutAnimationTo(destY, destX);
  }
}

ParallaxScrollView.propTypes = IPropTypes;

ParallaxScrollView.defaultProps = {
  backgroundColor: '#000',
  stickyHeaderHeight: 0,
  style: {}
};

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  parallaxHeaderContainer: {
    backgroundColor: 'transparent',
    overflow: 'hidden'
  },
  parallaxHeader: {
    backgroundColor: 'transparent',
    overflow: 'hidden'
  },
  backgroundImage: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0
  },
  stickyHeader: {
    backgroundColor: 'transparent',
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    left: 0,
    width: window.width
  },
  scrollView: {
    backgroundColor: 'transparent'
  }
});

module.exports = ParallaxScrollView;
