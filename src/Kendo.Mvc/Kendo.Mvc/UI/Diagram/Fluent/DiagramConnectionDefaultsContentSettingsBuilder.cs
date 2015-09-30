namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionDefaultsContentSettings settings.
    /// </summary>
    public class DiagramConnectionDefaultsContentSettingsBuilder<TShapeModel,TConnectionModel>: IHideObjectMembers where TShapeModel : class  where TConnectionModel : class
    {
        private readonly DiagramConnectionDefaultsContentSettings container;

        public DiagramConnectionDefaultsContentSettingsBuilder(DiagramConnectionDefaultsContentSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The template which renders the labels.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public DiagramConnectionDefaultsContentSettingsBuilder<TShapeModel,TConnectionModel> Template(string value)
        {
            container.Template = value;

            return this;
        }

        /// <summary>
        /// The template which renders the labels.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public DiagramConnectionDefaultsContentSettingsBuilder<TShapeModel,TConnectionModel> TemplateId(string value)
        {
            container.TemplateId = value;

            return this;
        }
        
        /// <summary>
        /// The static text displayed on the connection.
        /// </summary>
        /// <param name="value">The value that configures the text.</param>
        public DiagramConnectionDefaultsContentSettingsBuilder<TShapeModel,TConnectionModel> Text(string value)
        {
            container.Text = value;

            return this;
        }

        /// <summary>
        /// The name of the function that will create the content visual.
        /// </summary>
        /// <param name="name">The function name.</param>
        public DiagramConnectionDefaultsContentSettingsBuilder<TShapeModel, TConnectionModel> Visual(string name)
        {
            container.Visual = new ClientHandlerDescriptor
            {
                HandlerName = name
            };

            return this;
        }

        /// <summary>
        /// The function that will create the content visual.
        /// </summary>
        /// <param name="function">The function.</param>
        public DiagramConnectionDefaultsContentSettingsBuilder<TShapeModel, TConnectionModel> Visual(Func<object, object> function)
        {
            container.Visual = new ClientHandlerDescriptor
            {
                TemplateDelegate = function
            };

            return this;
        }
        
        //<< Fields
    }
}

