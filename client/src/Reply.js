import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  padding: 40px 20px;
  line-height: 2.7rem;
`;

const Reply = () => {
  return (
    <Container>
      <h2>感謝您的回覆，我們將盡快與您聯繫。</h2>
      <h2>
        若您欲瞭解更多資誠生醫相關資訊，歡迎造訪我們的網站：www.pwc.tw/bio」
      </h2>
    </Container>
  );
};

export default Reply;
