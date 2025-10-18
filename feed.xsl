<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  exclude-result-prefixes="atom"
>
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
	<title><xsl:value-of select="atom:feed/atom:title"/> - Atom feed</title>
	<link rel="stylesheet" type="text/css" href="/css/index.css"/>
	<link rel="stylesheet" href="https://fonts.cdnfonts.com/css/latin-modern-sans" />
      </head>
      <body>
	<div id="navigation-container">
	    <div id="navigation-options">
            <div class="nav-option"><a href="/">Home</a></div>
        </div>
    </div>
	<div class="grid-area">
	    <div class="content-area">
		<header id="title-block-header">
		  <div class="box">
		    <p><strong>Subscribe</strong> by copying the URL from the address bar into your newsreader app.</p>
		    </div>
		 </header>
		 <xsl:apply-templates select="atom:feed/atom:entry" />
	    </div>
	</div>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="atom:entry">
      <h3>
	<a><xsl:attribute name="href">
			<xsl:value-of select="atom:link/@href"/>
          </xsl:attribute>
          <xsl:value-of select="atom:title"/>
        </a>
      </h3>
      <small>
	      Published: <xsl:value-of select="atom:published" /> | Updated: <xsl:value-of select="atom:updated" /> | Author: <xsl:for-each select="atom:author"><xsl:if test="position()!=1">, </xsl:if><xsl:value-of select="atom:name"/></xsl:for-each>
      </small>
      <p>
	      <xsl:value-of select="atom:summary/node()" disable-output-escaping="yes" />
      </p>

  </xsl:template>

</xsl:stylesheet>
