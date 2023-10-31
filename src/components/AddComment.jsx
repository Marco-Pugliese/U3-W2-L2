import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = ({ asin }) => {
  const [comment, setComment] = useState({
    comment: "",
    rate: 1,
    elementId: asin,
  });

  // componentDidUpdate(prevProps) {
  //   if (prevProps.asin !== this.props.asin) {
  //     this.setState({
  //       comment: {
  //         ...this.state.comment,
  //         elementId: this.props.asin,
  //       },
  //     })
  //   }
  // }
  useEffect(() => {
    setComment({ ...comment, elementId: asin });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asin]);

  const sendComment = async (e) => {
    e.preventDefault();
    if (comment.elementId !== null) {
      try {
        let response = await fetch(
          "https://striveschool-api.herokuapp.com/api/comments",
          {
            method: "POST",
            body: JSON.stringify(comment),
            headers: {
              "Content-type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNTlhZWY2ZTNkZDAwMTQ5NWU0M2YiLCJpYXQiOjE2OTg3NTUxNTYsImV4cCI6MTY5OTk2NDc1Nn0.Lt2mEzp7bnpaBSEK7Rz8Z-HKFC5oyWZnvqWtprmozlA",
            },
          }
        );
        if (response.ok) {
          alert("Recensione inviata!");
          // this.setState({
          //   comment: {
          //     comment: "",
          //     rate: 1,
          //     elementId: this.props.asin,
          //   },
          // });
          setComment({
            comment: "",
            rate: 1,
            elementId: asin,
          });
        } else {
          throw new Error("Qualcosa è andato storto");
        }
      } catch (error) {
        alert(error);
      }
    } else {
      console.log("error: seleziona un libro");
    }
  };

  return (
    <div className="my-3">
      <Form onSubmit={sendComment}>
        <Form.Group className="mb-2">
          <Form.Label>Recensione</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci qui il testo"
            value={comment.comment}
            onChange={
              (e) => setComment({ ...comment, comment: e.target.value })
              // this.setState({
              //   comment: {
              //     ...this.state.comment,
              //     comment: e.target.value,
              //   },
              // })
            }
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Valutazione</Form.Label>
          <Form.Control
            as="select"
            value={comment.rate}
            onChange={
              (e) => setComment({ ...comment, rate: e.target.value })
              // this.setState({
              //   comment: {
              //     ...this.state.comment,
              //     rate: e.target.value,
              //   },
              // })
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Invia
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
