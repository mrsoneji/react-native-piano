import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { StyleSheet, View } from 'react-native'

import range from 'just-range'

import Key from './Key'

import MidiNumbers from './MidiNumbers'

class Piano extends Component {
  state = {
    noteRange: {
      first: MidiNumbers.fromNote('c4'),
      last: MidiNumbers.fromNote('e5')
    }
  }

  static propTypes = {
    onPlayNoteInput: PropTypes.func.isRequired,
    onStopNoteInput: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { noteRange } = this.props

    this.setState({
      ...this.state,
      noteRange: {
        first: MidiNumbers.fromNote(noteRange.first),
        last: MidiNumbers.fromNote(noteRange.last)
      }
    })
  }

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
    return range(this.state.noteRange.first, this.state.noteRange.last + 1);
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
                noteRange={ this.state.noteRange }
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
