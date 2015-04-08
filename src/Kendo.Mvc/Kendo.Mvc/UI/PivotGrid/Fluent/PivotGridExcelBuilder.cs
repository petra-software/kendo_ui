﻿namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// The fluent API for configuring the pivot grid Excel export.
    /// </summary>
    public class PivotGridExcelBuilder
    {
        private readonly PivotGridExcelSettings excel;

        public PivotGridExcelBuilder(PivotGridExcelSettings excel)
        {
            this.excel = excel;
        }

        /// <summary>
        /// Sets the file name of the excel file.
        /// </summary>
        public PivotGridExcelBuilder FileName(string fileName)
        {
            excel.FileName = fileName;

            return this;
        }

        /// <summary>
        /// Enables or disables filtering in the output Excel file.
        /// </summary>
        public PivotGridExcelBuilder Filterable(bool filterable)
        {
            excel.Filterable = filterable;

            return this;
        }

        /// <summary>
        /// Set the url of the server side proxy. The proxy is responsible for returning the excel file to the end user. Used in browsers that don't support saving files from JavaScript.
        /// </summary>
        /// <param name="url"></param>
        public PivotGridExcelBuilder ProxyURL(string url)
        {
            excel.ProxyURL = url;

            return this;
        }

        /// <summary>
        /// Forces the use of server-side proxy even if the browser supports local saving.
        /// </summary>
        /// <param name="forceProxy">true if the server proxy should be used always; false for automatic detection</param>
        public PivotGridExcelBuilder ForceProxy(bool forceProxy)
        {
            excel.ForceProxy = forceProxy;
            return this;
        }
    }
}