namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionDefaultsSettings settings.
    /// </summary>
    public class DiagramConnectionDefaultsSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramConnectionDefaultsSettings container;

        public DiagramConnectionDefaultsSettingsBuilder(DiagramConnectionDefaultsSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the label displayed on the connection path.
        /// </summary>
        /// <param name="configurator">The action that configures the content.</param>
        public DiagramConnectionDefaultsSettingsBuilder<TShapeModel,TConnectionModel> Content(Action<DiagramConnectionDefaultsContentSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramConnectionDefaultsContentSettingsBuilder<TShapeModel,TConnectionModel>(container.Content));
            return this;
        }
        

        /// <summary>
        /// Defines the editing behavior of the connections.
        /// </summary>
        /// <param name="enabled">Enables or disables the editable option.</param>
        public DiagramConnectionDefaultsSettingsBuilder<TShapeModel,TConnectionModel> Editable(bool enabled)
        {
            container.Editable.Enabled = enabled;
            return this;
        }

        
        /// <summary>
        /// Defines the editing behavior of the connections.
        /// </summary>
        /// <param name="configurator">The action that configures the editable.</param>
        public DiagramConnectionDefaultsSettingsBuilder<TShapeModel,TConnectionModel> Editable(Action<DiagramConnectionDefaultsEditableSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            container.Editable.Enabled = true;
            
            configurator(new DiagramConnectionDefaultsEditableSettingsBuilder<TShapeModel,TConnectionModel>(container.Editable));
            return this;
        }

        /// <summary>
        /// The connection end cap type.
        /// </summary>
        /// <param name="type">The end cap type.</param>
        public DiagramConnectionDefaultsSettingsBuilder<TShapeModel, TConnectionModel> EndCap(string type)
        {
            container.EndCap.Type = type;
            return this;
        }

        /// <summary>
        /// The connection end cap configuration or type name.
        /// </summary>
        /// <param name="configurator">The action that configures the endcap.</param>
        public DiagramConnectionDefaultsSettingsBuilder<TShapeModel,TConnectionModel> EndCap(Action<DiagramConnectionDefaultsEndCapSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramConnectionDefaultsEndCapSettingsBuilder<TShapeModel,TConnectionModel>(container.EndCap));
            return this;
        }
        
        /// <summary>
        /// Defines the hover configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the hover.</param>
        public DiagramConnectionDefaultsSettingsBuilder<TShapeModel,TConnectionModel> Hover(Action<DiagramConnectionDefaultsHoverSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramConnectionDefaultsHoverSettingsBuilder<TShapeModel,TConnectionModel>(container.Hover));
            return this;
        }

        /// <summary>
        /// Specifies if the connection can be selected.
        /// </summary>
        /// <param name="value">The value that configures the selectable.</param>
        public DiagramConnectionDefaultsSettingsBuilder<TShapeModel, TConnectionModel> Selectable(bool value)
        {
            container.Selectable = value;

            return this;
        }

        /// <summary>
        /// Defines the connection selection configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the selection.</param>
        public DiagramConnectionDefaultsSettingsBuilder<TShapeModel,TConnectionModel> Selection(Action<DiagramConnectionDefaultsSelectionSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramConnectionDefaultsSelectionSettingsBuilder<TShapeModel,TConnectionModel>(container.Selection));
            return this;
        }

        /// <summary>
        /// The connection start cap type.
        /// </summary>
        /// <param name="type">The start cap type.</param>
        public DiagramConnectionDefaultsSettingsBuilder<TShapeModel, TConnectionModel> StartCap(string type)
        {
            container.StartCap.Type = type;
            return this;
        }
        
        /// <summary>
        /// The connection start cap configuration or type name.
        /// </summary>
        /// <param name="configurator">The action that configures the startcap.</param>
        public DiagramConnectionDefaultsSettingsBuilder<TShapeModel,TConnectionModel> StartCap(Action<DiagramConnectionDefaultsStartCapSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramConnectionDefaultsStartCapSettingsBuilder<TShapeModel,TConnectionModel>(container.StartCap));
            return this;
        }
        
        /// <summary>
        /// Defines the stroke configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramConnectionDefaultsSettingsBuilder<TShapeModel,TConnectionModel> Stroke(Action<DiagramConnectionDefaultsStrokeSettingsBuilder<TShapeModel,TConnectionModel>> configurator)
        {
            configurator(new DiagramConnectionDefaultsStrokeSettingsBuilder<TShapeModel,TConnectionModel>(container.Stroke));
            return this;
        }

        /// <summary>
        /// The connections type.
        /// </summary>
        /// <param name="value">The value that configures the type.</param>
        public DiagramConnectionDefaultsSettingsBuilder<TShapeModel, TConnectionModel> Type(DiagramConnectionType value)
        {
            container.Type = value;

            return this;
        }

        /// <summary>
        /// The default source connector.
        /// </summary>
        /// <param name="value">The value that configures the default source connector.</param>
        public DiagramConnectionDefaultsSettingsBuilder<TShapeModel, TConnectionModel> FromConnector(string value)
        {
            container.FromConnector = value;

            return this;
        }

        /// <summary>
        /// The default target connector.
        /// </summary>
        /// <param name="value">The value that configures the default target connector.</param>
        public DiagramConnectionDefaultsSettingsBuilder<TShapeModel, TConnectionModel> ToConnector(string value)
        {
            container.ToConnector = value;

            return this;
        }
        
        //<< Fields
    }
}

