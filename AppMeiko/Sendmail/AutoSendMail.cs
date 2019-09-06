using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace AppMeiko.Sendmail
{
    public class AutoSendMail
    {
        public void SendMail(string mailTo, List<string> mailCC, string mailTitle, string IDyc, string date, string username, string mbody)
        {
            try
            {
                SmtpClient mailclient = new SmtpClient("smtp.gmail.com", 587);
                mailclient.EnableSsl = true;
                mailclient.Credentials = new NetworkCredential("appmeiko7@gmail.com", "duytuit89!");

                MailMessage message = new MailMessage("appmeiko7@gmail.com", mailTo);

                message.Subject = "Liên lạc mới từ " + mailTitle;

                message.Body = "ID yêu cầu:    " + IDyc + Environment.NewLine +
                               "Ngày yêu cầu:  " + date + Environment.NewLine +
                               "Người yêu cầu: " + username + Environment.NewLine +
                               "Nội dung:      " + mbody + Environment.NewLine + Environment.NewLine + Environment.NewLine + Environment.NewLine +
                               "Mail thông báo từ ứng dụng. Vui lòng không trả lời mail này!";


                //Nếu có nhập Cc
                if (mailCC.Count>0)
                {
                    for (int i = 1; i < mailCC.Count(); i++)
                    {
                        message.CC.Add(mailCC[i].ToString());
                    }
                }
                mailclient.Send(message);
            }
            catch (Exception)
            {
            }
        }
    }
}