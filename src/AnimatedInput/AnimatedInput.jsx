import React, { Component } from "react"
import styled, {keyframes} from "styled-components"
import PropTypes from "prop-types"

class AnimatedInput extends Component {
  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
    this.state = {
        fieldActivated:false,
      
    }

  }
  ActivateField = () =>{

    this.setState({
        fieldActivated:true,
    })
    this.props.onFocus()
  }
  DisableField = () =>{
      if(this.inputRef.current.value===""){
        this.setState({
            fieldActivated:false,
        })
      }
      this.props.onBlur()
   
  }
  render() {
    try {
      return (
        <Wrapper style={this.props.style}>
          <TextInput {...this.props}
           ref={this.inputRef}
           style={{}}
            onFocus={this.ActivateField}
            onBlur={this.DisableField}
           focusedColor={this.props.activeBorderColor}
          />
          <PlaceHolder className={!this.state.fieldActivated? "" : "focused"} role="label" >
           {this.props.placeholderName}
          </PlaceHolder>
          <ErrorMessage className={this.props.errorMessage===""? "hidden" : "show"} style={{pointerEvents:this.props.errorMessage===""? `none`:`default`,}}>
           {this.props.errorMessage===""? this.props.placeholderName : this.props.errorMessage}
          </ErrorMessage>
        </Wrapper>
      )
    } catch (e) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(e)
      }
      return null
    }
  }
}
const FadeIn = keyframes`
from{
  transform-style: preserve-3d;
  transform-origin: 0px 0px;
  transform: rotateX(-90deg);
  opacity: 0;
}
to{
 
  transform-style: preserve-3d;
  transform-origin: 0px 0px;
  
  transform:  rotateX(0deg);
  opacity: 1;
}
`

const ErrorMessage = styled.p`
position:relative;
/* Visibility is based on the content of the error message */
&.show{
  visibility:visible;
  animation: ${FadeIn} 0.15s ease-out;
}
&.hidden{
  visibility:hidden;
}
/* Font Related Properties */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 400;
    font-size: 12px;
    margin-top: 1px;
    color: rgb(137, 147, 164);
    line-height: 1.3rem;
    padding-top: 0px !important
`
const TextInput = styled.input`
  box-sizing: border-box;
  padding: 8px 10px;
  padding-left: 0 !important;
  margin: 0;
  border: none !important;
  border-bottom: 1px solid #e6e6e6 !important;
  :focus{
    border-bottom: 1px solid ${props => props.focusedColor ? props.focusedColor : "#e6e6e6"}  !important;
  
  }
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px !important;
  letter-spacing: 0;
  color: #262626;
  height: 40px;
  width: 100%;
  outline: none;
  line-height: 1em;
  align-items: center;
  box-shadow: 0 0 black;
`
const Wrapper = styled.div`
  display: block;
  position: relative;
  box-sizing: border-box;
  word-wrap: break-word;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`

const PlaceHolder = styled.label`
  position: absolute;
  left: 0;
  padding: 8px 10px;
  padding-left: 0 !important;
  font-size: 16px;
  height: 40px;
  width: 100%;
  top: 4px;
  pointer-events: none;
  margin-top: auto;
  margin-bottom: auto;
  line-height: 1em;
  transition: top 0.3s, font-size 0.3s;
  transition-timing-function: cubic-bezier(0.02, 0.01, 0.47, 1);
  &.focused{
    top: -22px; 
    font-size:14px;
  }
`
AnimatedInput.propTypes = {
onChange: PropTypes.func,
errorMessage: PropTypes.string,
placeholder:PropTypes.string,
}
AnimatedInput.defaultProps = {
   onChange: function(){},
   placeholder:"",
   errorMessage:"",
   onFocus:function(){},
   onBlur:function(){},
}

export default AnimatedInput
