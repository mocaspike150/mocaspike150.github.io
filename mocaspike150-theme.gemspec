# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "mocaspike150-theme"
  spec.version       = "2.5.0"
  spec.authors       = ["MOCA Spike 150"]
  spec.email         = ["ontouchstart@github.com"]

  spec.summary       = "Customized Jekyll theme based on https://github.com/jekyll/minima."
  spec.homepage      = "https://github.com/mocaspike150/mocaspike150-theme"
  spec.license       = "MIT"

  spec.metadata["plugin_type"] = "theme"

  spec.files = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r!^(assets|_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md|markdown)|$)))!i)
  end

  spec.add_runtime_dependency "jekyll", "~> 3.5"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.9"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.1"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.2"

  spec.add_development_dependency "bundler"
end
