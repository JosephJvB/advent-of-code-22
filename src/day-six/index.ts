import fs from 'fs'
import DataParser from './dataParser'

export default () => {
  const str = fs.readFileSync(__dirname + '/data.txt', 'utf8')
  // const dataParser = new DataParser(str, 4)
  const dataParser = new DataParser(str, 14)
  console.log('charsProcessed:', dataParser.numCharsProcessed)
  // testPackets()
  // testMessages()
}

function testMessages() {
  const strs = [
    'mjqjpqmgbljsphdztnvjfqwrcgsmlb', // : first marker after character 19
    'bvwbjplbgvbhsrlpgdmjqwftvncz', // : first marker after character 23
    'nppdvjthqldpwncqszvftbrmjlhg', // : first marker after character 23
    'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', // : first marker after character 29
    'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', // : first marker after character 26
  ]
  for (const s of strs) {
    const message = new DataParser(s, 14)
    console.log(message.numCharsProcessed)
  }
}
function testPackets() {
  const strs = [
    'bvwbjplbgvbhsrlpgdmjqwftvncz', //: first marker after character 5
    'nppdvjthqldpwncqszvftbrmjlhg', //: first marker after character 6
    'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', //: first marker after character 10
    'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', //: first marker after character 11
  ]
  for (const s of strs) {
    const packet = new DataParser(s, 4)
    console.log(packet.startMarker, packet.numCharsProcessed)
  }
}