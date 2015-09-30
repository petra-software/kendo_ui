using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Telerik.Web.Spreadsheet
{
    /// <summary>
    /// Represents a Row
    /// </summary>
    [DataContract]
    public partial class Row
    {
        /// <summary>
        /// The cells for this row.
        /// </summary>
        [DataMember(Name = "cells", EmitDefaultValue = false)]
        public List<Cell> Cells
        {
            get;
            set;
        }

        /// <summary>
        /// The row height in pixels. Defaults to rowHeight.
        /// </summary>
        [DataMember(Name = "height", EmitDefaultValue = false)]
        public double? Height { get; set; }

        /// <summary>
        /// The absolute row index. Required to ensure correct positioning.
        /// </summary>
        [DataMember(Name = "index", EmitDefaultValue = false)]
        public int? Index { get; set; }

    }
}
