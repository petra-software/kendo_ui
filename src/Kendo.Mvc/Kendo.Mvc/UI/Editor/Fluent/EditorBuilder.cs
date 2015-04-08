namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// The fluent API for configuring Kendo UI Editor for ASP.NET MVC.
    /// </summary>
    public class EditorBuilder : WidgetBuilderBase<Editor, EditorBuilder>, IHideObjectMembers
    {
        private Editor container;

        public EditorBuilder(Editor component)
            : base(component)
        {
            container = component;
        }

        /// <summary>
        /// Sets the HTML content that will show initially in the editor.
        /// </summary>
        /// <param name="value">The action which renders the HTML content.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().Editor()
        ///            .Name("Editor")
        ///            .Value(() => { %&gt;
        ///                &lt;blockquote&gt;
        ///                    According to Deep Thought, the answer to the ultimate question of
        ///                    life, the universe and everything is &lt;strong&gt;42&lt;/strong&gt;.
        ///                &lt;/blockquote&gt;
        ///             &lt;% })
        ///            .Render();
        /// %&gt;
        /// </code>
        public EditorBuilder Value(Action value)
        {
            Component.Template.Content = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content that will show initially in the editor.
        /// </summary>
        /// <param name="value">The predicate which renders the HTML content.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().Editor()
        ///            .Name("Editor")
        ///            .Value(@&lt;blockquote&gt;
        ///                    According to Deep Thought, the answer to the ultimate question of
        ///                    life, the universe and everything is &lt;strong&gt;42&lt;/strong&gt;.
        ///                &lt;/blockquote&gt;)
        ///            .Render();
        /// %&gt;
        /// </code>
        public EditorBuilder Value(Func<object, object> value)
        {
            Component.Template.InlineTemplate = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the item should display as a string.
        /// </summary>
        /// <param name="value">An HTML string.</param>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Editor()
        ///             .Name("Editor")
        ///             .Value("&lt;blockquote&gt;A towel has &lt;strong&gt;immense&lt;/strong&gt; psychological value&lt;/blockquote&gt;")
        /// %&gt;
        /// </code>
        public EditorBuilder Value(string value)
        {
            Component.Template.Html = value;

            return this;
        }

        /// <summary>
        /// Configure the client events.
        /// </summary>
        /// <param name="configurator">An action that configures the events.</param>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Editor()
        ///             .Name("Editor")
        ///             .Events(events => events
        ///                 .Change("onChange")
        ///             )
        /// %&gt;
        /// </code>
        public EditorBuilder Events(Action<EditorEventBuilder> configurator)
        {
            configurator(new EditorEventBuilder(Component.Events));

            return this;
        }

        /// <summary>
        /// Configure the available tools in the toolbar.
        /// </summary>
        /// <param name="configurator">An action that configures the tools.</param>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Editor()
        ///             .Name("Editor")
        ///             .Tools(tools => tools
        ///                 .Clear()
        ///                 .Bold()
        ///                 .Italic()
        ///                 .Underline()
        ///             )
        /// %&gt;
        /// </code>
        public EditorBuilder Tools(Action<EditorToolFactory> configurator)
        {
            configurator(new EditorToolFactory(Component.DefaultToolGroup));

            return this;
        }

        /// <summary>
        /// Allow rendering of contentEditable elements instead of the default textarea editor.
        /// Note: contentEditable elements are not posted to the server.
        /// </summary>
        /// <param name="tagName">The tag that will be rendered as contentEditable</param>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Editor()
        ///             .Name("Editor")
        ///             .Tag("div")
        /// %&gt;
        /// </code>
        public EditorBuilder Tag(string tagName)
        {
            Component.TagName = tagName;

            return this;
        }

        /// <summary>
        /// Encode HTML content.
        /// </summary>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Editor()
        ///             .Name("Editor")
        ///             .Value("&lt;blockquote&gt;A towel has &lt;strong&gt;immense&lt;/strong&gt; psychological value&lt;/blockquote&gt;")
        ///             .Encode(true)
        /// %&gt;
        /// </code>   
        public EditorBuilder Encode(bool value)
        {
            Component.Encode = value;

            return this;
        }

        public EditorBuilder Pdf(Action<PDFSettingsBuilder> configurator)
        {
            configurator(new PDFSettingsBuilder(Component.Pdf));

            return this;
        }

        public EditorBuilder Messages(Action<EditorMessagesBuilder> configurator)
        {
            configurator(new EditorMessagesBuilder(Component.Messages));

            return this;
        }

        /// <summary>
        /// Sets the CSS files that will be registered in the Editor's iframe
        /// </summary>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Editor()
        ///             .Name("Editor")
        ///             .StyleSheets(styleSheets => styleSheets.Add("editorStyles.css"))
        /// %&gt;
        /// </code>        
        public EditorBuilder StyleSheets(Action<EditorStyleSheetBuilder> configurator)
        {
            configurator(new EditorStyleSheetBuilder(Component.StyleSheets));

            return this;
        }

        /// <summary>
        /// Configure the file browser dialog.
        /// </summary>
        /// <param name="configurator">An action that configures the dialog.</param>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Editor()
        ///             .Name("Editor")
        ///             .FileBrowser(fileBrowser => fileBrowser
        ///                 .File("~/Content/UserFiles/{0}")
        ///                 .Read("Read", "FileBrowser")
        ///                 .Create("Create", "FileBrowser")
        ///                 .Destroy("Destroy", "FileBrowser")
        ///                 .Upload("Upload", "FileBrowser"))
        ///             )
        /// %&gt;
        /// </code>
        public EditorBuilder FileBrowser(Action<EditorFileBrowserSettingsBuilder> configurator)
        {
            var builder = new EditorFileBrowserSettingsBuilder(Component.FileBrowserSettings, Component.ViewContext, Component.UrlGenerator);

            configurator(builder);

            return this;
        }

        /// <summary>
        /// Configure the image browser dialog.
        /// </summary>
        /// <param name="configurator">An action that configures the dialog.</param>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Editor()
        ///             .Name("Editor")
        ///             .ImageBrowser(imageBrowser => imageBrowser
        ///                 .Image("~/Content/UserFiles/Images/{0}")
        ///                 .Read("Read", "ImageBrowser")
        ///                 .Create("Create", "ImageBrowser")
        ///                 .Destroy("Destroy", "ImageBrowser")
        ///                 .Upload("Upload", "ImageBrowser")
        ///                 .Thumbnail("Thumbnail", "ImageBrowser"))
        ///             )
        /// %&gt;
        /// </code>
        public EditorBuilder ImageBrowser(Action<EditorImageBrowserSettingsBuilder> configurator)
        {
            var builder = new EditorImageBrowserSettingsBuilder(Component.ImageBrowserSettings, Component.ViewContext, Component.UrlGenerator);

            configurator(builder);

            return this;
        }


        //>> Fields
        
        /// <summary>
        /// Relaxes the same-origin policy when using the iframe-based editor.
		/// This is done automatically for all cases except when the policy is relaxed by document.domain = document.domain.
		/// In that case, this property must be used to allow the editor to function properly across browsers.
		/// This property has been introduced in internal builds after 2014.1.319.
        /// </summary>
        /// <param name="value">The value that configures the domain.</param>
        public EditorBuilder Domain(string value)
        {
            container.Domain = value;

            return this;
        }
        
        /// <summary>
        /// If enabled, the editor renders a resize handle to allow users to resize it.
        /// </summary>
        public EditorBuilder Resizable()
        {
            return Resizable(true);
        }

        /// <summary>
        /// If enabled, the editor renders a resize handle to allow users to resize it.
        /// </summary>
        /// <param name="enabled">Enables or disables the resizable option.</param>
        public EditorBuilder Resizable(bool enabled)
        {
            container.Resizable.Enabled = enabled;
            return this;
        }

        
        /// <summary>
        /// If enabled, the editor renders a resize handle to allow users to resize it.
        /// </summary>
        /// <param name="configurator">The action that configures the resizable.</param>
        public EditorBuilder Resizable(Action<EditorResizableSettingsBuilder> configurator)
        {
            container.Resizable.Enabled = true;
            
            configurator(new EditorResizableSettingsBuilder(container.Resizable));
            return this;
        }
        
        /// <summary>
        /// Allows setting of serialization options.
        /// </summary>
        /// <param name="configurator">The action that configures the serialization.</param>
        public EditorBuilder Serialization(Action<EditorSerializationSettingsBuilder> configurator)
        {
            configurator(new EditorSerializationSettingsBuilder(container.Serialization));
            return this;
        }
        
        //<< Fields
    }
}