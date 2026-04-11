import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from '../../post/entities/post.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class CommentEntity {

    @Field(() => Int)
    id: number;

    @Field()
    content: string;

    @Field(() => Post)
    post: Post;

    @Field(() => User)
    author: User;

    @Field()
    createdAt: Date;
}
