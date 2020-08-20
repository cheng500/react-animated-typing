# react-animated-typing
Simple react component to animate any tag in text you want.

**[DEMO](https://nckdev.agency/lab/react-animated-typing/en)**

### Installation
`npm install --save react-animated-typing`

Use `npm start` to preview

### Simple Usage
```javascript
  <AnimatedText
    text='h1 Animated typing text'
    tag='h1'
  />
```

### Props
name|required|type|default|description
----|--------|----|-------|-----------
text|true|string||Text to be animated
tag|false|string|div|Tag that the text will be put in
delay|false|number|0|Delay of the animation start by ms
disabled|false|boolean|false|Disable animation start until set to true
href|false|string||href in case it is a link
speed|false|number|100|Time needed for each symbol to appear in a sequence in ms
style|false|Object||Outer div style
textStyle|false|Object||Inner Tag style
type|false|string||If type == 'random': Text will replace randomly generated characters instead of typing


### Support
If you like this plugin, please consider donating to a small time developer (me)!

**[Donate](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QX3XJ942LDLMQ&source=url)**
