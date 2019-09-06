namespace AppMeiko.Models.Paging
{
    public class PagdingModel
    {
        private const int MaxPageSize = 20;
        public int pageNumber { get; set; } = 1;
        public int _pageSize { get; set; } = 10;

        public int pageSize
        {
            get { return _pageSize; }
            set { _pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
    }
}