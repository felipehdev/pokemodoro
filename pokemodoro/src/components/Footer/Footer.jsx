import React from "react";
import S from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={S.footerCtn}>
      <br />
      <h2 className={S.footerTt}> Created by felipr</h2>
      <span className={S.footerIntro}>
        fullstack developer, visit my socials.
      </span>
      <div className={S.socialsCtn}>
        <img
          className={S.socialsIcos}
          src="https://cdn-icons-png.flaticon.com/128/733/733614.png"
          alt=""
        />
        <img
          className={S.socialsIcos}
          src="https://cdn-icons-png.flaticon.com/128/733/733609.png"
          alt=""
        />
        <img
          className={S.socialsIcos}
          src="https://cdn-icons-png.flaticon.com/128/2111/2111532.png"
          alt=""
        />
      </div>
      <div>. . .</div>
    </div>
  );
};

export default Footer;
