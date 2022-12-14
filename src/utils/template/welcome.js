exports.registrationTemplate = async (
  first_name,
  last_name,
  course,
  modeOfLearning,
  courseAmount,
  userId
) => {
  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html
        lang="en"
        xmlns="http://www.w3.org/1999/xhtml"
        xmlns:o="urn:schemas-microsoft-com:office:office"
      >
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width,initial-scale=1.0" />
          <meta name="x-apple-disable-message-reformatting" />
      
          <style>
            @import url("https://fonts.googleapis.com/css2?family=Podkova&family=Roboto&display=swap");
      
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
      
            body {
              background: #cccccc;
            }

            .welcome{
                 text-transform: capitalize;
            }
           
            @media screen and (max-width: 800px) {
              .content {
                width: 100%;
              }
      
              main {
                padding: 0 30px;
                width: auto;
              }
              .mag > img {
                width: 100%;
              }
            }
      
            @media screen and(max-width:500px) {
              .content {
                width: 100%;
              }
              .mag > img {
                width: 100%;
                padding: 2rem;
              }
            }
          </style>
        </head>
      
        <body style="margin: 0 auto; font-family: Open Sans, sans-serif">
          <div style="margin: 0 auto; width: 100%; max-width: 700px">
            <div
              class="mag"
              style="display: flex; align-items: center; justify-content: center"
            >
             
            </div>
            <main
              style="
                padding: 0rem 2rem;
                margin: 0 auto;
                width: 100%;
                max-width: 700px;
              "
            >
              <div
                class="content"
                style="
                  padding: 30px;
                  background: #ffffff;
                  background-image: url(https://res.cloudinary.com/dzbmybcul/image/upload/v1633437121/_2552030244800_kpskid.png);
                "
              >
                <div class="image" style="margin-bottom: 30px">
                  <img
                    src="https://res.cloudinary.com/drsimple/image/upload/v1669792225/Logo_presentation_2_wvx2v9.png"
                    alt=""
                    style="width: 100%"
                  />
                </div>
                <p style="font-size: 18px; line-height: 30px; font-weight: 400">
                
                  Welcome <span class="welcome">${first_name} ${last_name}</span> to the world of learning
                  <br />
                  <br />
                  <br />
      
                  <strong>it8</strong> is a Software and Web Development Academy that is committed to providing the best training in the industry.
                   We are a team of highly skilled and experienced professionals who are passionate about teaching and helping people to achieve their goals.
                  <br />
                  <br />
                  <br />
                    We are excited to have you on board and we look forward to seeing you in class. 
                    <br />
                    <br />

                  Payment Details are as follows:
                   <br />
                   <br />
                    <strong>Course: ${course}</strong>
                    <br />
                    <strong>Mode of learning: ${modeOfLearning} </strong>
                    <br />

                    <strong>Amount: </strong>NGN ${courseAmount}
                    <br />
                    <strong>Reference: </strong>it8-${userId}
                    <br />
                    <strong>Account Number: </strong> 0157518989
                    <br />
                    <strong>Account Name: </strong> Kehinde Omolabi
                    <br />
                    <strong>Bank: </strong> Guaranty Trust Bank
                    <br />
                    <br />
                    <br />
                    <strong>NOTE: <br>
                    <strong> Click on the link below to make payment </strong> <a href="https://paystack.com/pay/it8-acadmey">https://paystack.com/pay/it8-acadmey</a> </strong> <br>
                    </strong> Please send a screenshot of your payment to <a href="https://wa.me/2348133832003">+2348133832003</a> 
                    <br />
                    Add your reference number: it8-${userId} to the transaction details.
                    <br />
                    <strong> Contact Us: +2348133832003 </strong>

                </p>
                <br/>
                <a
                  href="https://it8-academy.com/"
                  target="_blank"
                  style="
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 18px;
                    display: block;
                    text-align: center;
                    width: 150px;
                    margin: auto;
                    background: #1d4ed8;
                    color: #ffffff;
                    padding: 1rem;
                    border-radius: 10px;
                  "
                  >
                    Visit Website
                  </a
                >
                <br />
                <br />
                <p
                  class="wel"
                  style="font-size: 18px; line-height: 30px; font-weight: 400"
                >
                  Cheers, <br />
                  The It8 Team
                </p>
              </div>
            </main>
            <footer style="padding-bottom: 50px">
              <p style="text-align: center; padding: 2rem">
                Need help or have a question? <br />We are
                <a
                  href="mailto:it8academy@gmail.com"
                  style="color: #1d4ed8; font-size: 18px"
                  target="_blank"
                  rel="noreferrer"
                  >here</a
                >, ready to talk.
              </p>
              <p style="text-align: center">
               
               
              </p>
            </footer>
          </div>
        </body>
      </html>
    `;
  return html;
};
