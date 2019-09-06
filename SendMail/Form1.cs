using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SendMail
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            try
            {
                SmtpClient mailclient = new SmtpClient("smtp.gmail.com", 587);
                mailclient.EnableSsl = true;
                mailclient.Credentials = new NetworkCredential("appmeiko7@gmail.com", "duytuit89!");

                MailMessage message = new MailMessage("appmeiko7@gmail.com", "tu.nguyenduy@meiko-elec.com");

                message.Subject = "Yêu cầu mới từ công đoạn Flux";

                message.Body = "ID yêu cầu:    "+"190813170944" + Environment.NewLine +
                               "Ngày yêu cầu:  "+"17/08/2019" + Environment.NewLine +
                               "Người yêu cầu: "+"nghĩa" + Environment.NewLine+
                               "Nội dung:      "+"hàng gấp"+ Environment.NewLine + Environment.NewLine+ Environment.NewLine+ Environment.NewLine+
                               "Mail thông báo từ ứng dụng. Vui lòng không trả lời mail này!";
                

                //Nếu có nhập Cc
                string MultiMail = "duytu89@gmail.com;duytu89@gmail.com;";
                if (MultiMail != "")
                {
                    //Cắt chuỗi Cc bằng dấu ";"
                    string[] cc = MultiMail.Split(';');

                    for(int i=0;i<cc.Count()-1;i++)
                    {
                        message.CC.Add(cc[i].ToString());
                    }
                }
                mailclient.Send(message);
                MessageBox.Show("Mail đã được gửi đi", "Thành công", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            catch (Exception)
            {
                MessageBox.Show("Mail chưa được gửi đi", "Error", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }
        private void SendMail(string mailTo, string mailCC, string mailTitle, string IDyc,string date,string username,string mbody)
        {
            try
            {
                SmtpClient mailclient = new SmtpClient("smtp.gmail.com", 587);
                mailclient.EnableSsl = true;
                mailclient.Credentials = new NetworkCredential("appmeiko7@gmail.com", "duytuit89!");

                MailMessage message = new MailMessage("appmeiko7@gmail.com", mailTo);

                message.Subject = "Yêu cầu mới từ công đoạn "+ mailTitle;

                message.Body = "ID yêu cầu:    " + "190813170944" + Environment.NewLine +
                               "Ngày yêu cầu:  " + "17/08/2019" + Environment.NewLine +
                               "Người yêu cầu: " + "nghĩa" + Environment.NewLine +
                               "Nội dung:      " + "hàng gấp" + Environment.NewLine + Environment.NewLine + Environment.NewLine + Environment.NewLine +
                               "Mail thông báo từ ứng dụng. Vui lòng không trả lời mail này!";


                //Nếu có nhập Cc
                string MultiMail = mailCC;
                if (MultiMail != "")
                {
                    //Cắt chuỗi Cc bằng dấu ";"
                    string[] cc = MultiMail.Split(';');

                    foreach (var _cc in cc)
                    {
                        message.CC.Add(_cc.ToString());
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
