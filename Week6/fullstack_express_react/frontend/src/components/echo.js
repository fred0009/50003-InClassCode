import { useState, useEffect } from "react";
import { Component } from "react";

function NewMessageBar({ message, onMessageChange, onSubmitClick }) {
  return (
    <div>
      <input
        type="text"
        placeholder=""
        value={message}
        onChange={(e) => {
          message = onMessageChange(e.target.value);
        }}
      ></input>
      <button onClick={onSubmitClick}> Submit </button>
    </div>
  );
}

function MessageList(messages) {
  let rows = [];
  for (let i in messages.messages) {
    rows.push(
      <tr>
        <td>{messages.messages[i].time}</td>
        <td>{messages.messages[i].msg}</td>
      </tr>
    );
  }
  return (
    <table>
      <tbody>
        <tr>
          <th>Date Time</th>
          <th>Message</th>
        </tr>
        {rows}
      </tbody>
    </table>
  );
}

function Echo() {
  const [msgTxt, setMsgTxt] = useState("");
  const [messages, setMessages] = useState([]);

  function handleSubmitClick() {
    alert("clicked " + msgTxt);
    submitNewMessage();
  }

  async function submitNewMessage() {
    const response = await fetch(`http://localhost:3000/echo/submit`, {
      method: "POST",
      body: `msg=${msgTxt}`,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    });
    const text = await response.text();
    const json = JSON.parse(text);

    setMessages(json);
  }

  async function initMessages() {
    const response = await fetch(`http://localhost:3000/echo/all`);
    const text = await response.text();
    const json = JSON.parse(text);
    setMessages(json);
  }

  useEffect(() => {
    initMessages();
  }, []);

  return (
    <div>
      <NewMessageBar
        message={msgTxt}
        onMessageChange={setMsgTxt}
        onSubmitClick={handleSubmitClick}
      />
      <MessageList messages={messages} />
    </div>
  );
}

// class Echo extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { msgTxt: "", messages: [] };
//   }
//   async initMessages() {
//     const response = await fetch(`http://localhost:3000/echo/all`);
//     const text = await response.text();
//     const json = JSON.parse(text);
//     this.setMessages(json);
//   }
//   componentDidMount() {
//     this.initMessages();
//   }

//   componentDidUpdate() {}

//   async submitNewMessage() {
//     const response = await fetch(`http://localhost:3000/echo/submit`, {
//       method: "POST",
//       body: `msg=${this.state.msgTxt}`,
//       headers: {
//         "Content-type": "application/x-www-form-urlencoded",
//       },
//     });
//     const text = await response.text();
//     const json = JSON.parse(text);
//     this.setMessages(json);
//   }

//   setMsgTxt(s) {
//     this.setState({ msgTxt: s, messages: this.state.messages });
//   }

//   setMessages(l) {
//     this.setState({ msgTxt: this.state.msgTxt, messages: l });
//   }

//   handleSubmitClick() {
//     this.submitNewMessage();
//   }

//   render() {
//     return (
//       <div>
//         <NewMessageBar
//           message={this.state.msgTxt}
//           onMessageChange={(s) => this.setMsgTxt(s)}
//           onSubmitClick={() => this.handleSubmitClick()}
//         />
//         <MessageList messages={this.state.messages} />
//       </div>
//     );
//   }
// }

export default Echo;
