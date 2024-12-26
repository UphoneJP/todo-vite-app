import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
const Error = () => {

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div>
        <h1>エラーが発生しました</h1>
        <div className="d-flex justify-content-center mt-5">
          <a href="/" className="btn btn-primary">ログイン画面へ戻る</a>
        </div>
      </div>

    </Container>
  )
}
export default Error;
