using System;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Security;

[assembly: AssemblyConfiguration("")]
[assembly: AssemblyCompany("Telerik AD")]
[assembly: AssemblyCopyright("Copyright © 2012-2015 Telerik AD")]
[assembly: AssemblyTrademark("")]
[assembly: AssemblyCulture("")]
[assembly: ComVisible(false)]
[assembly: CLSCompliant(true)]
#if TRIAL
[assembly: AssemblyTitle("Kendo.Mvc.Web Trial version")]
#else
[assembly: AssemblyTitle("Kendo.Mvc.Web")]
#endif
#if MVC3
[assembly: AssemblyVersion("2015.1.422.340")]
[assembly: AssemblyFileVersion("2015.1.422.340")]
#elif MVC4
[assembly: AssemblyVersion("2015.1.422.440")]
[assembly: AssemblyFileVersion("2015.1.422.440")]
#elif MVC5
[assembly: AssemblyVersion("2015.1.422.545")]
[assembly: AssemblyFileVersion("2015.1.422.545")]
#endif
[assembly: SecurityRules(SecurityRuleSet.Level1)]
[assembly: AllowPartiallyTrustedCallers]