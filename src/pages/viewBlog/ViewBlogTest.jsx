import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'

import React from 'react'
import BraftEditor from 'braft-editor'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import { Col, Row } from 'antd'

// 代码高亮插件
BraftEditor.use(CodeHighlighter())

const title = `
<h1 style="text-align:center;"><span style="font-size:40px">文章标题</span></h1>`

const text = `
<pre data-lang="javascript" class="lang-javascript"><code class="lang-javascript">var username = &quot;username&quot;;<br/><br/>var password = &quot;12345678&quot;;<br/><br/>var aFunction = function () {<br/>    // console.log(&#x27;username=&#x27; + username)<br/>}</code></pre><p></p><div class="media-wrap image-wrap"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtQAAADyCAYAAABtR1LyAAAgAElEQVR4Xu3df4xVZZ7n8c8km92NgjUq2NpsA7Vjj+7aNjYVnai4mGBsdNAQRxwgUKGTVmHshHa7IZg02WzoRAPtIkkboO2JRgjtqGsqwCDdkRkZac3qgNItm9F1loJeu1XQtiw1u5uNvTm/n/Occ+49995Tt55z75v/qDrneZ7zes6t+tynvue5f/SHP/zhD+IfAggggAACCCCAAAIItCXwRwTqttw4CQEEEEAAAQQQQAABX4BAzY2AAAIIIIAAAggggEAHAgTqDvA4FQEEEEAAAQQQQAABAjX3AAIIIIAAAggggAACHQgQqDvA41QEEEAAAQQQQAABBAjU3AMIIIAAAggggAACCHQgQKDuAI9TEUAAAQQQQAABBBAgUHMPIIAAAggggAACCCDQgQCBugM8TkUAAQQQQAABBBBAgEDNPYAAAggggAACCCCAQAcCBOoO8DgVAQQQQAABBBBAAAECNfcAAggggAACCCCAAAIdCHQUqP/u7w9rx87HdOz14/riiy86GAanIoAAAggggAACCCBQT4G2A7UXpr99z1/V86oZNQIIIIAAAggggAACFQm0HajvWrpC/3j09YqGQTMIIIAAAggggAACCNRToO1AfellV1LmUc85Z9QIIIAAAggggAACFQq0Haj/7VevqHAYNIUAAggggAACCCCAQD0FCNT1nDdGjQACCCCAAAIIIOCIAIHakYlgGAgggAACCCCAAAL1FCBQ13PeGDUCCCCAAAIIIICAIwIEakcmgmEggAACCCCAAAII1FOAQF3PeWPUCCCAAAIIIIAAAo4IEKgdmQiGgQACCCCAAAIIIFBPAQJ1PeeNUSOAAAIIIIAAAgg4IkCgdmQiGAYCCCCAAAIIIIBAPQUI1PWcN0aNAAIIIIAAAggg4IgAgdqRiWAYCCCAAAIIIIAAAvUUIFDXc94YNQIIIIAAAggggIAjAgRqRyaCYSCAAAIIIIAAAgjUU4BAXc95Y9QIIIAAAggggAACjggQqB2ZCIaBAAIIIIAAAgggUE8BAnU9541RI4AAAggggAACCDgiQKB2ZCIYBgIIIIAAAggggEA9BQjU9Zw3Ro0AAggggAACCCDgiIB7gfrym3XvnDH917/5bzo70UjT/kzLF1+mqXE/n+rEyHM60k7HYVs6sV97XvlookdO+wgggAACCCCAAAKOCPRvoPaC+7wp6QB9+c1apF9o/z91aXa6+eahS5dENwgggAACCCCAQL8J9G2gvvyWYc3Xy9r5/DuTN+cE6smzp2cEEEAAAQQQQKAiAfcDtV2W8W4Ugi/QvL9cpJmn0yUW0669Q38x892gZKTwXCl1XCHmpVr07es0I/r++FtBu/7qtnT4iDR/3sWSPyb5x+rIk/4Kd9z+8QH9hXeM/+89Hf7pL+QtgPuBPm5YYRuTGO4ruqFoBgEEEEAAAQQQ6DcB5wP1tGtv1uX/4xdhXXMQcDOhNa63DkL2Hx+PQm3xuVIUlpOQm5784PvnGTXRl1/7Zzr7ShSooyAdheCcsV0xJRWU/ZB9xadxqBYr1P32euN6EUAAAQQQQKAHBZwP1La5t7I79+NwVdpfgZ6h09GDhP7/B3QsXAVueG74zXilOFp9Dr/uh98//lV+SUhe/XUY0FNh3wzPfrvp0E2g7sFXFJeEAAIIIIAAAn0nUItAbZdHjMerxumyj7wQXHyuOddBO1dMjXb5yC8nic+ISj5Swb3Z6rl3dnoFnUDdd683LhgBBBBAAAEEelDA8UAdlmXEddNB7XG8Qq2wVtlfSf4oVe4Rl3Q0ODdvBTt4UNFuyzqSQN2DLwUuCQEEEEAAAQQQaE/AuUCdelgwp8bYDtSKyjxGxjR3gfSLqJ66zLmWmbnC3XAXkLYDtfcG4ev6OCpRoYa6vbuWsxBAAAEEEEAAAYcEHAvUVkmEXSPtB9mLlZR8BJJ+yD7vU+n0i8mHqjQ59/Jb7tC018wPcbHqm8MdQj4Jd+3w+0k9lKjk4UJ/FPkPJZpjzYT03GDu0N3BUBBAAAEEEEAAAQSaCjgSqJPt6eywHOyMMSW4kHdf1mFdlyr5CBJ1zoe0ROUgBeem2g2Z3jXCs/+lom33WlihPnx6huZHY7AefIxqqq/wPqrRKE1pOmscgAACCCCAAAIIIOCMgCOB2hmPygZSbp/ryrqjIQQQQAABBBBAAIFJEiBQTxA8gXqCYGkWAQQQQAABBBBwTIBAPUETQqCeIFiaRQABBBBAAAEEHBMgUDs2IQwHAQQQQAABBBBAoF4CBOp6zRejRQABBBBAAAEEEHBMgEDt2IQwHAQQQAABBBBAAIF6CRCo6zVfjBYBBBBAAAEEEEDAMQECtWMTwnAQQAABBBBAAAEE6iVAoK7XfDFaBBBAAAEEEEAAAccECNSOTQjDQQABBBBAAAEEEKiXAIG6XvPFaBFAAAEEEEAAAQQcEyBQOzYhDAcBBBBAAAEEEECgXgIE6nrNF6NFAAEEEEAAAQQQcEyAQO3YhDAcBBBAAAEEEEAAgXoJEKjrNV+MFgEEEEAAAQQQQMAxAQK1YxPCcBBAAAEEEEAAAQTqJUCgrtd8MVoEEEAAAQQQQAABxwQI1I5NCMNBAAEEEEAAAQQQqJcAgbpe88VoEUAAAQQQQAABBBwTIFA7NiEMBwEEEEAAAQQQQKBeAgTqes0Xo0UAAQQQQAABBBBwTIBA7diEMBwEEEAAAQQQQACBegkQqOs1X4wWAQQQQAABBBBAwDEBArVjE8JwEEAAAQQQQAABBOolQKCu13wxWgQQQAABBBBAAAHHBAjUjk0Iw0EAAQQQQAABBBColwCBul7zxWgLBa7Q/Cdv0kz9RoeHn9PY/d/S7d84Tzr1gnZtPIFbJwLL79DKhV8JLT/QlY8u11VTpdMHt+nwnk4a5lwEEEAAAQR6Q4BA3RvzyFUoHahPhyFw7PU92rv1DD6dCKQC9QnN3LRW82d9ojd2Pq5f/7KThjkXAQQQQACB3hAgUPfGPHIVmh6snOq49t73osYI1NXdE9ffqNvvnSOFb04I1NXR0hICCCCAQG8IEKh7Yx65CjtQhyFwjLKEzu8NK1AP+OU0Y35pzenOW6cFBBBAAAEEai/gRKAeXrJLt80+pX1bfqAnU6TLtHndrRocPaAlz/ws+M7F39cTK+fo3Pi4z3Vs17168L3kxHkLdmrt3DPat+WAZtyzRnMHwu+NHde2n/xIR1qYthXbD+r+obMauWaFNsXnbdCzry7StKM/1o1rnoq/Ghw7JWl9dL+G7noo05t93HhuO16f+zXj0Hd09dSwifGj2rpgrXb7/w3GoH3zNPJls99Ra6ySlm/Ti98dUtSM9Klee2ShVkf1rxt36+ht0sgjH2qBf5zXhtG3dR3Nxt8Cb5cPDcpCBqwykPyAGJWQREMsKnGwjwtquJOgafT5/g1BLXL4z6xB9sdw6Untve+MrvJrwYN/eSUrwQqxQZeqEw9W6gff2aM3LljuH+e3EfdtX0ez8bc4RTd8T0/cN0fnjj6vJRvC12yLTXA4AggggAACdRNwIlDr6z/UM9+cpZM/X6n1vzII/a9PNwLzMm2+Z4b2GqE4COPpUB0E6nP8hj47tl2rDr0sKSecl5itsoE6OE6poOp9bfFvF+rOJIlr49NHtHi2EXrDsCsjVJuBNQnbQYAejMNt+H/vGuKvLdUOL4DLCt6HLtFIHMQVjsEI1X6gnqbx8bM6tOBNzfHeLIx/Kr39hH6qVak3FGXGX4J1kg4pG6jDkJkKqldo/qPT9YZXThKN3lq59b4chF0zVJuBNfl6EOIV1yEH/z9PkhF4w7IVO3hf9f7jycOA4RgG4rGGgVqfSO/s12Et0u2XSmNTx/TG8FsaNN9QlBp/a1M1b90OrR3yXnuntG/pRusNcmttcTQCCCCAAAJ1EXAjUBeEXT8sn99kVTlcsVYcnKUoUNsBvVR71syVDdR+0LzQDLI5t0AYns/um5cK2XYfUaA+aR2X7iMM1KlVayl/vNZY7BDvB+rZCsL77CC4h+3KfKOgYKW72fhL3fzDm3Tzn5vLrOmz3v/bYR1P/7miVLONDyoZqEuWi/jh+YKwZjvu2O4jDNTj1nFWH1GgTu+ckT9e+xrTIT6sJZ+a3u0kaDf9RqHc+FtkZ4W6RTAORwABBBDoBQFHAnUUgr0yjajsI1hRvsgIyvng2eOCQK1MKUg7E1Y2UMerylbANfssDLvhCnFUhpG32p0de6OyE7tExT7bOjfVf3ol3BzLkRvyyl8kWeNvx7k755QM1PGOIY22hisKu2Gg/Sjari9vtTt7tY3KTuwSFfvs9Lnp/tMr4eZYlFv+oqgWPR5/d2aGXhBAAAEEEKizgDOBOqqN/iAq+/DLPZSpqzbLOUz4pLQjCufdDdT+WMKV3nhcVu1xUC5RdLskJRhVB+pMbXc4hLicpGSgfndxufG7+4IoG6i9K4hWeqOrsWqPo1KLoouNSzCqDtR2zXM0gKicpGSgPjjd37kjerwgcxns3+3ubczIEEAAAQScE3AnUOs6PeA9QPj74AFEvzxDxsOIKirlcGOF2p7ZODwbobpUOYaiso10PXb2zim3Qp1fPlLxCnU7t7XLJR/29cTh2QzV5coxFK12Nwmo5Vao88tHql2hbmcyOQcBBBBAAIH+FnAoUEvBw4neqvQJfW3drVLqIcUwcMuuqZ6EQJ2qOU52+cgN1WZddcnSiOpWqPMeUvRG2V6gXv0nwcOLqR1CavX6yQvB6Zrjwm3gMnXVdmlHEUSFK9Q5Dyl6vbYXqMNPPKy8tGOZNj91iwZ5KLFWrwwGiwACCCDQmYBbgTp8OFGjpzR4/seZLe4yO3oYW+hNVMlHVMYRPyBolHUkO3B4wXWR3l2Q3Vov2ZXDm6gw4E7N2drOmMfqAnXOjh7GFnqtlnys3lNu/J3dkhN5tvXhL6myDmNnjuV36PYvvZT6hEV7Vw5/lKU+PKbCQJ3Z0SPaVcQbTIslH97HsZcaf4vzMbxJz9waPGz62dHtWrXllRYb4HAEEEAAAQTqJ+BYoFZQ6jHb3O7ORA1XqePCT2/v6mA123x4scqHEr3e0zXIyR7Nl79t7kNtbGMXDtneXzq6ktxa6kxpSDUlH0mIj3r3xh9ujRdt1Veyhjrat7rZ+N1+GaRrkJM9mpXaPzrZxi66Gnt/6fDrubXU2dKQmZWUfCQhPhqVN35/a7z4g1ZK1lB7gdr713T8rc7mtXrgsTWa6216zl7UreJxPAIIIIBATQWcC9Q1dWTYCCAQCkR7UZ88MKz1lW99CDMCCCCAAALuCRCo3ZsTRoRAjQXCGurx49p298MtfSppjS+aoSOAAAII9LkAgbrPbwAuH4FqBJJSD2qnqxGlFQQQQACB+ggQqOszV4wUAQQQQAABBBBAwEEBArWDk8KQEEAAAQQQQAABBOojQKCuz1wxUgQQQAABBBBAAAEHBQjUDk4KQ0IAAQQQQAABBBCojwCBuj5zxUgRQAABBBBAAAEEHBQgUDs4KQwJAQQQQAABBBBAoD4CBOr6zBUjRQABBBBAAAEEEHBQgEDt4KQwJAQQQAABBBBAAIH6CBCo6zNXjBQBBBBAAAEEEEDAQQECtYOTwpAQQAABBBBAAAEE6iNAoK7PXDFSBBBAAAEEEEAAAQcFCNQOTgpDQgABBBBAAAEEEKiPAIG6PnPFSBFAAAEEEEAAAQQcFCBQOzgpDAkBBBBAAAEEEECgPgIE6vrMFSNFAAEEEEAAAQQQcFCAQO3gpDAkBBBAAAEEEEAAgfoIEKjrM1eMFAEEEEAAAQQQQMBBAQK1g5PCkBBAAAEEEEAAAQTqI0Cgrs9cMVIEEEAAAQQQQAABBwUI1A5OCkNCAAEEEEAAAQQQqI8Agbo+c8VIEUAAAQQQQAABBBwUIFA7OCkMCQEEEEAAAQQQQKA+AgTq+swVI0UAAQQQQAABBBBwUIBA7eCkMCQEEEAAAQQQQACB+ggQqOszV46OdKl2HPqOrv5wv4buemgSx3iF5j95k2bqNzo8/JzG7v+Wbv/GedKpF7Rr44lJHFcPdL38Dq1c+JXQ8gNd+ehyXTVVOn1wmw7v6YHr4xIQQAABBBDoUIBA3SEgp7sZqE+HIXDs9T3au/UM09SJQCpQn9DMTWs1f9YnemPn4/r1LztpmHMRQAABBBDoDQECdW/M4yRehSuBenqwcqrj2nvfixprEqiDUKjCFeyBaIU7kh0P2zWkM8d432uyIh73a7cXhdbMTAYr7qetr9t9m28c4j5y7worCOf0m1l5vv5G3X7vHCl8c0KgnsSXG10jgAACCDgpQKB2clrqNChHA3UYAsfssoQwQJ4++IK08CbNzAnAfli99GQQzP2pCMtJckJ1aqbCPgeKQrUZXnMD9UCJVd+SY8m5hfwgfEHyxiAI5Ur1GQX1VKi2AnVwzFhu0K/TnctYEUAAAQQQqErAiUA9vGSXbpt9Svu2/EBPpq5smTavu1WDowe05JmfBd+5+Pt6YuUcnRsf97mO7bpXD76XnDhvwU6tnXtG+7Yc0Ix71mjuQPi9sePa9pMf6UgLeiu2H9T9f/qWti74nRa/ukiD4bnjR3+sG9c8lWpp49NHtHi28aXR/Lpi+7i8trR8m1787pCmxs2NauSaFdrk/T/83tl983Sn/4X0P3/MQ2eT47VBzxpjlz7Va48s1Gqj/jU5Z79meDXRUcfjR7V1wVrtNrrIXKf3vYJrbYF64g/1g+EFesNf8Q2Dacka67zwmTdgO7Qmx4Qr6B+9oMO6KRVs/WP8sN08UBe334TPCsVSMp50jXngMtBuqcwN39MT983RuaPPa8mG8DU78TNLDwgggAACCEyqgBOBWl//oZ755iyd/PlKrf+V4eF/fboRmJdp8z0ztNcIxUEYT4fqIFCf4zf02bHtWnXoZUk54bwEfRA0p/hHnowC7MbdOnrb7OT/krzjFv92YRJwo0BsBc0gjBrhWNLGpw9qxogRcMNzZYZ272uLf6cb/Qf/goA8LSfUe+NM3gSs1e5wrGZoj64pvp7onPA6k2PDIB5fQ7gaLTNku7JCXWIyU4d0N1Cbq7qyVopLB+qiVfcSlx6UaZjlI1aJTNRGB314Tcxbt0Nrh7zX3intW7rReoNcYqAcggACCCCAQA0F3AjUBWHXD8vnN1lVDlesFQdnKQrUdkAv1Z41iXnhUyoXIrPhudx58kPwtMwqcjK0oJ3L3w5Xya3j/X7lrY6PFuzAkQ3G+dfphf0jWnxhGKBzx1XymuwXx/Am3fznXhFz/r/3/3ZYx9N/rqj45dVaoM4G0pzhxOUk1u4XVkjNXWXOraG26qejVeyDJzW4cI6iP7wo3NnErrOOR5hZnQ6/E5WoROc3K1kpMwOsUJdR4hgEEEAAgR4TcCRQRyHYK9OIyj6CFeWLjKCcb589LgjUypSCtDN32fKJoJVU0CxoOO/cuFyiUYlEXO6RLc2IukpC80PBivTQFAUry0pC9MglftlIaqU7bMAeW/B/NQjxRdfcZqBuZzIqPaeFQG3tcpEahhWE83YVsQN0ubKNcAV5avIQYfwgYqr+Ojou/+FFb6yN3wxE5wdXxa4old5kNIYAAggg0CcCzgTqqDb6g6jswy/3UKau2iznMOcoKe2Iwnm3A7VdpxyNLl3e4X3VLCPx/p9bQ52pe063k5R1vKJ5h1ZJb5/V1Re+Ga9K+6vXL13rB+q8Wms7QBOoC17xUWBu9kCif3pOuM2pjS4XqCXlPgyYfojQ77ZRmUbR6rRx3kB0bfGbg+Jw3ic/F7lMBBBAAAEEWhJwJ1DrOj3gPUD4++ABRL88Q8bDiF59ZlgbnS7lcGGFOgzT1gN8RavbyQyFq7tTi0J1eGRYBy0loTpp+03NOXSJRv5a+vZ3L9Sha97UnFcXSV699z8HDzYWB+rkwcWuB+o6lHzYJRFlXlqpcJv/gF/pQG0/OFn04GKDQF28Ol2wW0gVZR9lnDgGAQQQQACBHhJwKFBLwcOJ3qr0CX1t3a1S6iHFMHDLrqmejEBtPRSY85BishJt7raRd+eULJmw65f9/0sj+6TFVyYr09Ne3C/ddqPO+rt4FLWd/XqZQJ37BiEK+3XY5SPF36Tko50wba8WK/yEwUY/MBqtfNs12Q23AszZIaTM6nRml5P2t+ULLnOZNj91iwZ5KLGHfk1wKQgggAACzQTcCtThw4kaPaXB8z/ObHGX2dHD2EKvmyUfmYcNc3b0SLaWM0s1NuhZbzXZ3IYuZ0ePzI4hUc22uTuIsa1etFtHUkpi9FmwI4ldL10mUEfb9cU12f4YLpPGp2jqpH/0eLNb3f5+g0DdbpguuV91qRXqgpXi7Ipz8XWUq51Of9BLVKfddi318CY9c2vwsOlnR7dr1ZZXWp0YjkcAAQQQQKB2Ao4FagWlHrPN7e5M03CVOt7ewNu7OljNNh9erP6hxGDbvPhfzt7Mwc4cySbUXl30T7XK2g862UM62V/a2I7P6CKz13Omz6hmO7s/9VT7WGtsZulI1GWpQO0dnGor6FvxriLeln4u/wvDZ8EQow8zafhJg8aKct5xmU8ZzOkrL1DnfepiUVt2v7nht1TpRvqBxGioZa6heJav1QOPrdFc7wZnL2qXXwyMDQEEEECgQgHnAnWF11ZJU83roCvphkYQ6BmBaC/qkweGtX5Ctz7sGTIuBAEEEECg5gIE6iYTSKCu+R3O8LssENZQjx/XtrsfbulTSbs8ULpDAAEEEECgMgECNYG6spuJhvpZICn1oHa6n+8Drh0BBBDoTwECNYG6P+98rhoBBBBAAAEEEKhIgEBdESTNIIAAAggggAACCPSnAIG6P+edq0YAAQQQQAABBBCoSIBAXREkzSCAAAIIIIAAAgj0pwCBuj/nnatGAAEEEEAAAQQQqEiAQF0RJM0ggAACCCCAAAII9KcAgbo/552rRgABBBBAAAEEEKhIgEBdESTNIIAAAggggAACCPSnAIG6P+edq0YAAQQQQAABBBCoSIBAXREkzSCAAAIIIIAAAgj0pwCBuj/nnatGAAEEEEAAAQQQqEiAQF0RJM0ggAACCCCAAAII9KcAgbo/552rRgABBBBAAAEEEKhIgEBdESTNIIAAAggggAACCPSnAIG6P+edq0YAAQQQQAABBBCoSIBAXREkzSCAAAIIIIAAAgj0pwCBuj/nnatGAAEEEEAAAQQQqEiAQF0RJM0ggAACCCCAAAII9KcAgbo/552rRgABBBBAAAEEEKhIgEBdESTNIIAAAggggAACCPSnAIG6P+edq0YAAQQQQAABBBCoSIBAXREkzSCAAAIIIIAAAgj0pwCBuj/nnatGAAEEEEAAAQQQqEiAQF0RJM0ggAACCCCAAAII9KcAgbo/5734qjfu1tHbZkvjR7V1wVrt7mGf4SW75F1q/G/0gJY887NaXHE09s+ObdeqQy87OOZr9cBja3TZ29u1assryfhu+J6euO+reuvR1XrwpSqHvUybn7pFg16To89ryYZ6zGOVArSFAAIIIDB5AgTqybPvYs8b9OyrizTt6I9145qnGvfbJ4E6CKSf69iue/Xge12cioZdLdPmdbfqohIh2fVAPfzQk7pt9intW7pRT1rX3Oh77c1EEN7nfkiQbs+PsxBAAAEEOhUgUHcqGJ6/8ekjWmyudkbtOrHS20KgrsjD7WaC4Dro3Ip0+UDtsu+8dTu0dkg6VrgKHQZgHde2ux/WkU4vZsJWvTsdGOcjgAACCPSLAIG6opn2A/WFrpZJEKjT0+xqcHV1XK28SILSi4uOWqUedhN+CJ4jNTuuTNfDm/TMrdMbBPgyjXAMAggggAAC7Qs4EaiDP1+f0r4tP7D+PJyzknjx9/XEyjk6N77m7J/t5y3YqbVzz2jflgOacc8azR0IDx47rm0/+VHrK2LLt+nF7w5patznp3rtkYVavSeBLxWow3bO7punOzcVn+u3pf0aGrkk1e9J67yghaXaceg7ujoeXDK2FdsP6v6hKYV3x7hZAhKVekRHj+7X0F0P5Z5rr8an2pHk9/unb2nrgt9p8auLgrpWeWXZJUpO2r+XWzizcXBN7h/zfsye49+3OqAlL81I3ZMnf75S639lDye8l+MvJ/d70N85heM366Ttuu/8vrym7P6yr5PWxl+ON1idPpNb6mG3UFnpB4G63ORwFAIIIIDAhAk4Eaj19R/qmW/OUiYc+F+fbtS5LtPme2ZorxGK82phzYCShJF2/8y/Qc8eukQjxgN6QaBMh+rKA7VfPjKqkWtWyMveQThWOshHQT9VVrJUO56+VkfuMh8obGWFOgzoH+YF6qCdQbO/aAxGAE+CvGEUBvb8NwUTdn8bDV+nB8w3V5kuk8DZUqD258kOx0rXZof3t1IlJsu0eYm0PvUQZAsr1OEbyw/ywnvYnxnEo9eE+RpLwnmT8ZeenhZrmf0gPEsnDwxrvV1oXbpPSQTqVrQ4FgEEEEBgAgTcCNTRappV0+r/wj+/yapyGCxkPMiVFx48u1LtlUEOQ6SMFdfqA7W1Cp6zul2qT/96qgnUQVA+G4f8iMoO+1GgTofnVsaQTMK563fo+qGi1dvP9c6jq/U//6HMpJnHVLhCbT/YmAm6YZD/fZkdRKoI1EX9hV/36pbDN6S5D2Y2CurNmMMyjg9KB+SS5SHN+iVQNxPi+wgggAACEyzgSKCWsquCZcNF9rigLWuVsFLIbDgseigxVebQSsmHXY+dObeVgNrKsUUr1OHXlVMnbo0tP3i3MoZKJyunsQoDtf2Gzw6kLQXUsve8pKJ2c95gRgD2ayz3DWZL47VoWw62La5oF9wWfunIhRU94DjRtx7tI4AAAgj0pIAzgToTEPw/WytTV11Ub5r983Z1gbqoFtkMy6VWi6sM1AVt5d+lrYTZJoE6rxTEWrEnUM9RXIqRKVtq9HOkukCdVwpiv9Gse6AOascWsJEAABDtSURBVLDVeclIT/5o56IQQAABBLop4E6gVvpP1fEDU0aNaX4px8SuUJctX+h6oG6pjKM7gTp62LLKQO18yYejK9TFgdp7WDd42LLugTr6QckKdTd/ZdAXAggggECegEOBWgoeTvRWpU/oa+tulVIPXGVrQIMLmshAXVTmUFDy0WzbvNxV5eyDfrnhPHNugxKMzEw3etDQPrj42MY11EltdZWBemJetm2UfOQ86FcukLbyMGwL9daFpRlNaqiNWu5y429hBqihbgGLQxFAAAEEeknArUAdhmONntLg+R9ntrjLPERlbKE3USUfmR09jC30Wi75CFeVB+MdMcIw7d1Rxs4Z5QK1pGiru9QWd3m7fEh5O5Pk38gldvkw+8t5QLPugTqz60y0S4ekzBZ2zVaoFT0fcE7qXP+NYGaXj3DVuMwnOJbY5cPc0SPvuYLKA7VarIlml49e+l3CtSCAAAJ9LeBYoI4CRTq4JDNkb33mbfcVrGabH9dc7UOJ9j7P3lZ2b2qO9VHepUo+vAux9rT2dsIY+XK0b3Ow1V3pQJ3TnpTdIzvws68jvS904Sc9SsrbrSPaW9pr2d4Kr/aB2gjBgZ13nwV7ml/2z9u16tDL/ldbCqRGKE/atPdd976T3d4vs/Vj7o8sax/3Ev21NP6SPyZb3oe6iocJW34YsuTFcBgCCCCAAAIlBZwL1CXHzWEIIOCkQLAV3uDo81qy4WfFI2y5PKTBxRKonbwTGBQCCCDQTwIE6n6aba4VgS4IBKvU5zTYfSMsDfH2xL774dY/udS+Bj+cf1VvPbpaD77UhQukCwQQQAABBCwBAjW3BAIIVC4QbGn3uY7lhNzKPnI8HnXJVfHKr5IGEUAAAQQQCAQI1NwJCCAwAQLBKvRlb2/Xqi2vJO1P2GpyGKq9npqVm0zA1dIkAggggEB/CxCo+3v+uXoEEEAAAQQQQACBDgUI1B0CcjoCCCCAAAIIIIBAfwsQqPt7/rl6BBBAAAEEEEAAgQ4FCNQdAjp/urXvtfkBMhM29ulT9Q93XqCpUQfjH+m/7B7XrgnrMK/hoKZWB4a13vucbevfwP3f0u3fOE9jr+/R3q1nujoyOpPw7427wH/AVE22SOyNS+UqEEAAgYYCBOo+ukFKf/hMhSb/6bZZWjzQ7UDdfFs2Al2Fk9xGU/i3gebiKeF+4jpqPXzq4lgZEwIIIDCBAgTqCcR1rel+CdSltmVbfodWLvyKTh/cpsN7XJupPhgP/r0zyVV9hHzviHAlCCDQhwIE6j6a9L4I1GU/gY9AN7l3Pv6T619x76XexFbcJ80hgAACLgkQqMvOxsbdOnrb7OTo0f0auuuh1Nkrth/U/UNTio/x65kv0z89slDvLj6ixVFz40e1dcFa7TZbs2ufNaqRa1ZokzXepn0axzcP1Bv07KuLNBifk99nWTLvuGYlHyvnXaz/eOW/Spr8X+/rG/v+t9XFv9DOFTN0TVyUnXx7/Nfv6j8c+X/xF/xf7Bd29gl8QTnCmA4PP6fTcctXaP6TN2nArrm+/kbdfu8cDcTH/cY6L/hGVOIQHZap3fYD5oDe2Pm4xhau1fxZ0ZFme8EYdHCb3vhSUAMe/Mvrc7qufHS5rjLMUn36/UmHd36kq/zxe228pIHonFMvaNfGEwl0GIDjL9jfb+WmqPzYZZrzN7doytHt+uVmY8/rFvoJXkdnrddY8HqYdvTHunHNU4aF9zoeSp4RKPnaHLfb8X+mTNNr9s+DVHvBGLRvnka+bP58yXttLtWOQ9/R1cacp/r0+5NGHvlQC/zxe23s14zoHPtnWomfeTEKpR8t3G0cigACvShAoC4xq34QnS2d3DdPd0aJduNuPasV4f+jX2TmL7kwnJph2QjJyS+68Djzl1l4nMxfwN7XFv9ON8YhvmSfZQN1Tp/BdXcWqosDdRSSxzWy/SP9Z3+c/1rPrfmSBlMPMYbHKanDjkL4ycOndMd/NycweBDxog7rOUsH6jBMywzZ3tcWntFeI4zO3OQFZCP05p1nBtY4rIahWMe1974XNaYgUM/0LrnwmMBj5qZvaeDg4/r1L0OfsP04VIcBfmx8TG/c95YGvTcL459I7+zXYS1KvaEIPOSH/aC9cBzOhOouBupSr00p89rJO88MrPHrP3xdK3qTbbzJLTwmmOONTx/UjJGFWh2VMIXtxz9rwgA/Pn5Whxa8qTnem4XxT6W3n9BPtSr1hiJ4gyE/7Aft5fycSv3sbP7cQokftRyCAAII1FaAQN1s6sJfhGfNMG2fY6w0xb/M/N9wwap2HMSjQG2tBGVWjovaM/st22fJQJ2/el2wQtfMzPh+YaD+9xfo9fn/Uq8++57uNTfZ8L8+VXFYDncMOZsKz2Hwtlez/VrO6bkfd93CkMPV5BIr1Maqchxc7Y7C8Dxm1WpnQrsdeMN20seFQXY8CtjBQflvAOyBWOE81d9FQVAP21UqQBeszKeuPbsanurdGm8rc1Hu2C4G6jKvzYKfGZlVcDvwhhebPi7njbmk/BV1W8sK56n+Zgd/jQrf8CsVoAte902ufd66HVo7dEb7lm5UzsY65aaSoxBAAIGaChCom0xcmV9cxSu51i+mgl+0mTAbr2R/aqwQpQdaus9SgbooOIe/kD/MlreUvd+LArX/9X9jrk5HLQZheVpUymEHbP8w65jw1Kp+obe6Qj2gT4zV27RMYdi1w3ipmuL8cFsuUHur1ms1/4IwjKf6T684p1akZyWlKKk3DQVvFMreF9Ue18VAXeK1Wfgzww6k9hvuXJT812aZn0tec6mfLan+0yvOqRXpP0lKUVILBM0WFyp6Q1vtvUFrCCCAQHcECNRNnJvXHVu/tFLtWX8mLRuo/TYa1zMXj6v4T7OF52TqtS2UnHrxsrdnw0Cdu52evfpcVPKhzOp21wO1j2CUYfj/T9czB+UeRVpGEK86UGdqu8MxRKvFJQP16WvMWu3sdUzWLinnrt+h64fOaXAbntLxv9yo90veqC3VUJd5bRqPW6SHYLxJrjpQF72Oo7KzkoH6yA3WsyCWYar0zfwegbrk3cZhCCDQiwIE6iazWmYlqFm4jR9qailQGwOLay2TeubSfZrNeDXRF+Y8ABkGhMzDVxXc8e0G6niFOqqrTo3l/2RLRSRNTqA2BhbXQSehuuzqsaoM1FGYtmqcK12hTs1HH5V82K+JnNdmmZ8ZfjNVBuoy5WQlA/XqohXqZj8PCNTNhPg+Agj0sACButnklvml17CeOXiK3//TabuBOv7la7RVts9SgbrV0o7wAaSp0smCTyKMum2vhjqprQ4eQPy/xoOLDSasol/ouSG4oMY5M5rcUo5g947COmuvkQoDdfYhwmCUbQVqBbuY2DXgzV423f3+BJV8FNQ4Z64tt5TDeK0WYZT52VLwZtcO7dmHCINO2yr5ULCLScPnRnKuqao3tN29d+gNAQQQqEaAQN3UMdpNw6pnztvlI34y32u0ePcO+xeVvdrs/XJc/NuFyY4i0S/G1I4b9m4ABX2WCtTJallma688n3CLrHO97402/tjhprt8GLt3xLt8mA8bFj28mDtv1ezykQm3xg4c5tZzXnC96v3HUx8Mk9nRQ9Hqbf52evFlVBioo/EnYzVWkFss+fDeBATXVFwn3vQlNOEHdB6oM6vFxg4c5muipdfm1CY75FQYqKPxJ2M1ttBrseTDe/MfPKNR/AxHdkrZ5WPCb3M6QAABpwUI1CWnJ9o6Lz48U1fcZA9Y78QWVqgz/eXtVa3mfWb2qTauNxOec2sw836pNl6hzuwtbfaZ2jc6u7+0va+0d2rwAGPOROXsWV3FPtReT+l9o5M9mgff2aO9W5NtSTI10gU7WuTWUpslGVUG6px9r71a55P/ro2HEsNt9+x9tP3ZmPDdO0q+OFVBoI53zoj2kU/2aL787fQ+1OVem1Eota7B/LlRZaDOjD/Y5vP4lUaZV9mSj3DbvdyfHbk/hySV/UClslPKcQgggEDNBAjUNZuwfhtuEKZzaqbD3T8yAZwPmOi3W4TrdUCgqjeyDlwKQ0AAAQTaEiBQt8XGSd0RyO7wEfcb7k8t65MSve8HH4P8ecf7UXfnGukFgZoL+M8uzGr6PEXNr5LhI4AAAg0FCNTcIE4L5K9QR6Ui+bt9SFFJyik+ZMLp2WVwtRfgL0K1n0IuAAEEqhEgUFfjSCsTKJBbQ536ePK8zoMHFNVkF5IJHDZNI9DzAv5fg9T4weSeR+ACEUAAAUkEam4DBBBAAAEEEEAAAQQ6ECBQd4DHqQgggAACCCCAAAIIEKi5BxBAAAEEEEAAAQQQ6EDAmUAdfMrWOZLYnaGD+eRUBBBAAAEEEEAAgS4LOBOoo+sOgrXY8qzLNwLdIYAAAggggAACCLQn4Fygltidob2p5CwEEEAAAQQQQACByRBwNlBfdHS7Vm15ZTJM6BMBBBBAAAEEEEAAgdICBOrSVByIAAIIIIAAAggggEBWgEDNXYEAAggggAACCCCAQAcCDgbq4GOjL3ubko8O5pVTEUAAAQQQQAABBLok4GCglvyPs519SvuWbtSTXYKgGwQQQAABBBBAAAEE2hFwMlD7F3LD9/TEfXN0rgjW7Uws5yCAAAIIIIAAAgh0R8DJQO2vUF94XNvuflhHuuNALwgggAACCCCAAAIItCXgYKAO9qFm27y25pOTEEAAAQQQQAABBLosQKDuMjjdIYAAAggggAACCPSWAIG6t+aTq0EAAQQQQAABBBDosgCBusvgdIcAAggggAACCCDQWwIE6t6aT64GAQQQQAABBBBAoMsCzgXqeet2aO2QdOzR1XrwpS5r0B0CCCCAAAIIIIAAAi0KOBOogyB9jj/8kweGtZ5PdGlxKjkcAQQQQAABBBBAYDIEnAnUk3Hx9IkAAggggAACCCCAQKcCBOpOBTkfAQQQQAABBBBAoK8FCNR9Pf1cPAIIIIAAAggggECnAgTqTgU5HwEEEEAAAQQQQKCvBQjUfT39XDwCCCCAAAIIIIBApwIE6k4FOR8BBBBAAAEEEECgrwUI1H09/Vw8AggggAACCCCAQKcCBOpOBTkfAQQQQAABBBBAoK8FCNR9Pf1cPAIIIIAAAggggECnAgTqTgU5HwEEEEAAAQQQQKCvBQjUfT39XDwCCCCAAAIIIIBApwIE6k4FOR8BBBBAAAEEEECgrwUI1H09/Vw8AggggAACCCCAQKcCBOpOBTkfAQQQQAABBBBAoK8FCNR9Pf1cPAIIIIAAAggggECnAm0H6ksvu1JffPFFp/1zPgIIIIAAAggggAACtRZoO1DftXSF/vHo67W+eAaPAAIIIIAAAggggECnAm0H6r/7+8P69j1/1Wn/nI8AAggggAACCCCAQK0F2g7U3lV7oXrHzsd07PXjlH/U+jZg8AgggAACCCCAAALtCnQUqNvtlPMQQAABBBBAAAEEEOgVAQJ1r8wk14EAAggggAACCCAwKQIE6klhp1MEEEAAAQQQQACBXhEgUPfKTHIdCCCAAAIIIIAAApMiQKCeFHY6RQABBBBAAAEEEOgVAQJ1r8wk14EAAggggAACCCAwKQIE6klhp1MEEEAAAQQQQACBXhEgUPfKTHIdCCCAAAIIIIAAApMiQKCeFHY6RQABBBBAAAEEEOgVAQJ1r8wk14EAAggggAACCCAwKQIE6klhp1MEEEAAAQQQQACBXhEgUPfKTHIdCCCAAAIIIIAAApMiQKCeFHY6RQABBBBAAAEEEOgVAQJ1r8wk14EAAggggAACCCAwKQL/Hz+ixue87W82AAAAAElFTkSuQmCC"/></div><p>abcd1234;</p><p>abcd1234;</p><p>abcd1234;</p><p>abcd1234;</p><p>abcd1234;</p><p></p>
<hr>
<pre data-lang="javascript" class="lang-javascript"><code class="lang-javascript">var username = &quot;username&quot;;<br/><br/>var password = &quot;12345678&quot;;<br/><br/>var aFunction = function () {<br/>    console.log(&#x27;username=&#x27; + username)<br/>}</code></pre><p></p><div class="media-wrap image-wrap"><img src="data:image/png;base64,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"/></div><p>abcd1234;</p><p>abcd1234;</p><p>abcd1234;</p><p>abcd1234;</p><p>abcd1234;</p><p></p>
<hr>
`

class ViewBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: BraftEditor.createEditorState(title + text),
    }
  }

  componentDidMount() {
    // 清除高度, 默认是500px
    if (document.querySelector('.bf-content')) {
      document.querySelector('.bf-content').classList = ''
    }
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }

  render() {
    const { editorState } = this.state
    return (
      <Row justify="space-around" type="flex">
        <Col lg={ 18 } span={ 24 }>
          <div style={ {
            backgroundColor: 'white',
            padding: '8px',
          } }>
            <BraftEditor
              value={ editorState }
              controls={ [] }
              readOnly="true"
            />
          </div>
        </Col>
      </Row>
    )
  }
}

export default ViewBlog
