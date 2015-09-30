using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Telerik.Web.Spreadsheet
{
    /// <summary>
    /// Represents a Sort
    /// </summary>
    [DataContract]
    public partial class Sort
    {
        /// <summary>
        /// Specifies the sort options for individual columns.
        /// </summary>
        [DataMember(Name = "columns", EmitDefaultValue = false)]
        public List<SortColumn> Columns
        {
            get;
            set;
        }

        /// <summary>
        /// The sorted range, e.g. "A1:D5".
        /// </summary>
        [DataMember(Name = "ref", EmitDefaultValue = false)]
        public string Ref { get; set; }

    }
}
