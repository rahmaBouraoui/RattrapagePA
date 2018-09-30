<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

class AppExtension extends AbstractExtension
{
    public function getFilters(): array
    {
        return [
            new TwigFilter('ellipsis', [$this, 'ellipsisFilter'], ['is_safe' => ['html']]),
        ];
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('function_name', [$this]),
        ];
    }

    public function ellipsisFilter($value, int $length)
    {
        return strlen($value) > $length ? substr($value, 0, $length).'...' : $value;
    }
}
