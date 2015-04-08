namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the TreeListSortableSettings settings.
    /// </summary>
    public class TreeListSortableSettingsBuilder<T>: IHideObjectMembers where T : class
    {
        private readonly TreeListSortableSettings container;

        public TreeListSortableSettingsBuilder(TreeListSortableSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// If set to true the user can get the treelist in its unsorted state by clicking the sorted column header.
        /// </summary>
        /// <param name="value">The value that configures the allowunsort.</param>
        public TreeListSortableSettingsBuilder<T> AllowUnsort(bool value)
        {
            container.AllowUnsort = value;

            return this;
        }
        
        /// <summary>
        /// The sorting mode. If set to "single" the user can sort by one column. If set to "multiple" the user can sort by multiple columns.
        /// </summary>
        /// <param name="value">The value that configures the mode.</param>
        public TreeListSortableSettingsBuilder<T> Mode(string value)
        {
            container.Mode = value;

            return this;
        }
        
        //<< Fields
    }
}

