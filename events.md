---
layout: page
title: Events
permalink: /events/
---
{%- if site.events.size > 0 -%}
    {%- for events in site.events -%}
        <div style="margin-bottom: 1em">
            <a class="events-link" href="{{ events.url | relative_url }}">
               {{ events.title | escape }}
            </a>
        </div>
      {%- endfor -%}
{%- endif -%}

