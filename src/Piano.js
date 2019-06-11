import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { StyleSheet, View } from 'react-native'

import range from 'just-range'

import Key from './Key'

import MidiNumbers from './MidiNumbers'

class Piano extends Component {
  static propTypes = {
    onPlayNoteInput: PropTypes.func.isRequired,
    onStopNoteInput: PropTypes.func.isRequired
  };

  getNaturalKeyCount() {
    return this.getMidiNumbers().filter((number) => {
      const { isAccidental } = MidiNumbers.getAttributes(number);
      return !isAccidental;
    }).length;
  }

  getNaturalKeys() {
    return this.getMidiNumbers().filter((number) => {
      const { isAccidental } = MidiNumbers.getAttributes(number);
      return !isAccidental;
    });
  }

  getAccidentalKeys() {
    return this.getMidiNumbers().filter((number) => {
      const { isAccidental } = MidiNumbers.getAttributes(number);
      return isAccidental;
    });
  }

  getMidiNumbers() {
    return range(this.props.noteRange.first, this.props.noteRange.last + 1);
  }

  getNaturalKeyWidth() {
    return 1 / this.getNaturalKeyCount();
  }

  render() {
    const naturalKeyWidth = this.getNaturalKeyWidth();
    return (
      <View style={ styles.container}>
        {
          this.getMidiNumbers().map(midiNumber => {
            const { isAccidental } = MidiNumbers.getAttributes(midiNumber);
            return (
              <Key
                naturalKeyWidth={ naturalKeyWidth }
                midiNumber={ midiNumber }
                noteRange={ this.props.noteRange }
                accidental={ isAccidental }
                onPlayNoteInput={ this.props.onPlayNoteInput }
                onStopNoteInput={ this.props.onStopNoteInput }
                useTouchEvents={ true }
                key={ midiNumber }
              />                  
            )
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    position: 'relative', 
    backgroundColor: 'red', 
    borderTopColor: 'red', 
    borderTopWidth: 1,
  }
})

export default Piano
