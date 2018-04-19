<!DOCTYPE html>
<html class="no-js" lang="en">

<meta http-equiv="content-type" content="text/html;charset=utf-8" />


<head>

    <meta charset="utf-8">

    <base>

    <title>Special educational support centre - Planquadrat</title>

    <meta name="viewport" content="width=device-width,initial-scale=1">

    <link rel="stylesheet" type="text/css" href="../../../../css/planquadrataabc.css" media="all">
    <!--<![endif]-->

    <script src="../../../../script/lib/modernizr-2.8.3.min06ac.js" type="text/javascript"></script>

    <script type="text/javascript">
        function decryptCharcode(n, start, end, offset) {
            n = n + offset;
            if (offset > 0 && n > end) {
                n = start + (n - end - 1);
            } else if (offset < 0 && n < start) {
                n = end - (start - n - 1);
            }
            return String.fromCharCode(n);
        }

        function decryptString(enc, offset) {
            var dec = "";
            var len = enc.length;
            for (var i = 0; i < len; i++) {
                var n = enc.charCodeAt(i);
                if (n >= 0x2B && n <= 0x3A) {
                    dec += decryptCharcode(n, 0x2B, 0x3A, offset);
                } else if (n >= 0x40 && n <= 0x5A) {
                    dec += decryptCharcode(n, 0x40, 0x5A, offset);
                } else if (n >= 0x61 && n <= 0x7A) {
                    dec += decryptCharcode(n, 0x61, 0x7A, offset);
                } else {
                    dec += enc.charAt(i);
                }
            }
            return dec;
        }

        function linkTo_UnCryptMailto(s) {
            location.href = decryptString(s, -2);
        }

        /*]]>*/
    </script>

    <link rel="canonical" href="/index.php" />
</head>

<body>
    <?php include('../../header.php');?>
    <div class="site-wrap">
        <div class="page-container main-content">
            <!--TYPO3SEARCH_begin-->
            <a id="c9"></a>
            <a id="c418"></a>
            <div class="project">
                <div class="slideshow">
                    <div class="slideshow--prev"></div>
                    <div class="slideshow--next"></div>
                    <div class="slideshow--slide active"><img src="../../../../img/fileadmin/_processed_/8/4/csm_20150916_104548_d4a5b31b9a343c.jpg?_=1458221445" width="1600" height="900" sizes="100vw"  alt=""></div>
                    <div class="slideshow--slide"><img src="../../../../img/fileadmin/_processed_/0/d/csm_20150916_113155_e6a9b24d520c46.jpg?_=1458221448" width="1600" height="900" sizes="100vw" alt=""></div>
                    <div class="slideshow--slide"><img src="../../../../img/fileadmin/_processed_/4/c/csm_20150916_115202_21802eba840c46.jpg?_=1458221448" width="1600" height="900" sizes="100vw" alt=""></div>
                    <div class="slideshow--slide"><img src="../../../../img/fileadmin/_processed_/b/c/csm_13045-Evonik-Grundriss_93773521e81a04.jpg?_=1459433789" width="1600" height="800" sizes="100vw" alt=""></div>
                </div>
                <div class="project__details">
                    <h1 class="project__name">Evonik G 37 Darmstadt</h1>
                    <div class="project__location">General Planning<span class="project__details-comma">, </span>
                        <br>Darmstadt<span class="project__details-comma">, </span>
                        <br>2014</div>
                    <ul class="project__technical-details">
                        <li>Phases: 1&#x20;- 7</li>
                        <li>Planingtime: 2014 - 2015</li>
                        <li>BGF: 2,325 m<sup>2</sup></li>
                        <li>BRI: 8,316 m<sup>3</sup></li>
                    </ul>
                </div>
                <div class="project__details-pull"></div>
            </div>
            <div class="container">
                <div class="project__description">
                    <p>The former production and warehouse building&nbsp; G37 dating back to 1955 is located on the new Health Care Campus Evonik in Darmstadt. The building was gutted and converted into offices. In the course of this measure the building skeleton was preserved to a large extent after extensive strengthening, whilst inside new and modern office were created. Here employees from several production areas come together in one location and a central place of interdisciplinary exchange is created. The new office building offers 86 modern and flexible workplaces that can be converted into meeting rooms depending on requiremetns. Furthermore, there are centrally arranged service rooms and communication islands.&nbsp; </p>
                </div>
                <div class="project__detail-image"></div>
            </div>
            <!--TYPO3SEARCH_end-->
            <div class="related-projects no-print">
                <div class="related-projects__title-wrapper">
                    <div class="related-projects__title">Related projects</div>
                </div><a href="../../141-0410-wohnhaeuser-muenchen/show/index.php" class="related-projects__project"><span class="related-projects__project-name">Residential houses Munich</span><img src="../../../../img/fileadmin/_processed_/0/2/csm_0410-Tsingtauer-Strasse-Mu__nchen-Foto-2_220a2538bae1f8.jpg?_=1458224590"></a></div>
            <!--TYPO3SEARCH_begin-->
            <!--TYPO3SEARCH_end-->
        </div>
        <?php include('../../footer.php');?>
    </div>
    <div class="intro">
        <div class="intro__overlay"></div>
        <div class="page-container">
            <div class="intro__container">
                <div class="intro__content">
                    <a id="c316"></a>
                    <a id="c414"></a>
                    <p>We are planquadrat.
                        <br />Architects and urban planners. &nbsp;
                    </p>
                    <p>We are competent.
                        <br />We are well-organised. &nbsp;
                    </p>
                    <p>We look forward to meeting you.</p>
                </div>
            </div>
        </div>
    </div>

    <script async src="../../../../script/planquadrat07a0.js" type="text/javascript"></script>
    <script type="text/javascript">
        /*<![CDATA[*/
        /*typo3temp/compressor/merged-2daa2608ace2e9620f0902484752d5d4-5515d922be721954537de0df62398e8a.js*/

        document.addEventListener('DOMContentLoaded', function() {
            window.isReady = true;
        });

        /*]]>*/
    </script>

</body>


</html>
