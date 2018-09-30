<?php

namespace App\Repository;

use App\Entity\MessageRedif;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method MessageRedif|null find($id, $lockMode = null, $lockVersion = null)
 * @method MessageRedif|null findOneBy(array $criteria, array $orderBy = null)
 * @method MessageRedif[]    findAll()
 * @method MessageRedif[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MessageRedifRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, MessageRedif::class);
    }

}
