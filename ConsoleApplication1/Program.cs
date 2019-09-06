using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                using (var FluxDB = new AppMeikoEntities())
                {
                 
                    int thutuMax = FluxDB.Fluxes.Select(x => (int?)x.Thutu).Max()??0;
                    string groupflux = "GF" + DateTime.Now.ToString("yyMMdd") +"-"+string.Format("{0:00}", thutuMax+1);
                    Console.WriteLine(groupflux);
                    Console.ReadLine();
                }

            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
                Console.ReadLine();
            }
        }
    }
}
