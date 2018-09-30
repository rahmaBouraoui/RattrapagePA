<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180930200619 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE message_redif (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE message_redif_user (message_redif_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_4AA4CFD8DBF5025A (message_redif_id), INDEX IDX_4AA4CFD8A76ED395 (user_id), PRIMARY KEY(message_redif_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE message_redif_message (message_redif_id INT NOT NULL, message_id INT NOT NULL, INDEX IDX_69D1EE68DBF5025A (message_redif_id), INDEX IDX_69D1EE68537A1329 (message_id), PRIMARY KEY(message_redif_id, message_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(255) NOT NULL, password VARCHAR(64) NOT NULL, roles JSON NOT NULL COMMENT \'(DC2Type:json_array)\', enabled TINYINT(1) DEFAULT \'1\' NOT NULL, expired TINYINT(1) DEFAULT \'0\' NOT NULL, locked TINYINT(1) DEFAULT \'0\' NOT NULL, credentials_expired TINYINT(1) DEFAULT \'0\' NOT NULL, cgu TINYINT(1) DEFAULT \'0\' NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649F85E0677 (username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE followers (user_id INT NOT NULL, follower_id INT NOT NULL, INDEX IDX_8408FDA7A76ED395 (user_id), INDEX IDX_8408FDA7AC24F853 (follower_id), PRIMARY KEY(user_id, follower_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE message_like (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE message_like_user (message_like_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_3E5F0C011513C03E (message_like_id), INDEX IDX_3E5F0C01A76ED395 (user_id), PRIMARY KEY(message_like_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE message_like_message (message_like_id INT NOT NULL, message_id INT NOT NULL, INDEX IDX_21314FBA1513C03E (message_like_id), INDEX IDX_21314FBA537A1329 (message_id), PRIMARY KEY(message_like_id, message_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE message (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, libelle VARCHAR(255) NOT NULL, INDEX IDX_B6BD307FA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE message_redif_user ADD CONSTRAINT FK_4AA4CFD8DBF5025A FOREIGN KEY (message_redif_id) REFERENCES message_redif (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE message_redif_user ADD CONSTRAINT FK_4AA4CFD8A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE message_redif_message ADD CONSTRAINT FK_69D1EE68DBF5025A FOREIGN KEY (message_redif_id) REFERENCES message_redif (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE message_redif_message ADD CONSTRAINT FK_69D1EE68537A1329 FOREIGN KEY (message_id) REFERENCES message (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE followers ADD CONSTRAINT FK_8408FDA7A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE followers ADD CONSTRAINT FK_8408FDA7AC24F853 FOREIGN KEY (follower_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE message_like_user ADD CONSTRAINT FK_3E5F0C011513C03E FOREIGN KEY (message_like_id) REFERENCES message_like (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE message_like_user ADD CONSTRAINT FK_3E5F0C01A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE message_like_message ADD CONSTRAINT FK_21314FBA1513C03E FOREIGN KEY (message_like_id) REFERENCES message_like (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE message_like_message ADD CONSTRAINT FK_21314FBA537A1329 FOREIGN KEY (message_id) REFERENCES message (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307FA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE message_redif_user DROP FOREIGN KEY FK_4AA4CFD8DBF5025A');
        $this->addSql('ALTER TABLE message_redif_message DROP FOREIGN KEY FK_69D1EE68DBF5025A');
        $this->addSql('ALTER TABLE message_redif_user DROP FOREIGN KEY FK_4AA4CFD8A76ED395');
        $this->addSql('ALTER TABLE followers DROP FOREIGN KEY FK_8408FDA7A76ED395');
        $this->addSql('ALTER TABLE followers DROP FOREIGN KEY FK_8408FDA7AC24F853');
        $this->addSql('ALTER TABLE message_like_user DROP FOREIGN KEY FK_3E5F0C01A76ED395');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307FA76ED395');
        $this->addSql('ALTER TABLE message_like_user DROP FOREIGN KEY FK_3E5F0C011513C03E');
        $this->addSql('ALTER TABLE message_like_message DROP FOREIGN KEY FK_21314FBA1513C03E');
        $this->addSql('ALTER TABLE message_redif_message DROP FOREIGN KEY FK_69D1EE68537A1329');
        $this->addSql('ALTER TABLE message_like_message DROP FOREIGN KEY FK_21314FBA537A1329');
        $this->addSql('DROP TABLE message_redif');
        $this->addSql('DROP TABLE message_redif_user');
        $this->addSql('DROP TABLE message_redif_message');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE followers');
        $this->addSql('DROP TABLE message_like');
        $this->addSql('DROP TABLE message_like_user');
        $this->addSql('DROP TABLE message_like_message');
        $this->addSql('DROP TABLE message');
    }
}
