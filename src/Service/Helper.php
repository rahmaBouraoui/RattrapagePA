<?php

namespace App\Service;

class Helper
{
    /**
     * @param null|int $size
     * @return string
     */
    public function generateUniqueId(int $size = 50): string
    {
        $id = md5("".(time() * rand(100, 999)));

        if (! is_null($size) && is_int($size)) {
            $id = substr($id, 0, $size);
        }

        return $id;
    }

}